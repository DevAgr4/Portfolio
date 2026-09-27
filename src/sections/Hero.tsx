"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDragging3D, setIsDragging3D] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const manualRot = useRef({ x: 0.35, y: 0.55 });
  const rotVelocity = useRef({ x: 0, y: 0 });

  // ── Cursor Parallax Depth ──
  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };
  const resetSection = () => setTilt({ x: 0, y: 0 });

  // ── Magnetic 3D Tilt for Badges & Buttons ──
  const handleTilt = (e: React.MouseEvent<HTMLElement>, max = 12, lift = 1.05) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${lift})`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  // ── Real-Time 3D Holographic Model Canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // 1. Icosahedron Outer Core Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [x / len, y / len, z / len];
    });

    const icoEdges: [number, number][] = [];
    for (let i = 0; i < icoVertices.length; i++) {
      for (let j = i + 1; j < icoVertices.length; j++) {
        const d = Math.hypot(
          icoVertices[i][0] - icoVertices[j][0],
          icoVertices[i][1] - icoVertices[j][1],
          icoVertices[i][2] - icoVertices[j][2]
        );
        if (d < 1.15) icoEdges.push([i, j]);
      }
    }

    // 2. Inner Octahedron Core Vertices
    const octVertices = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ];
    const octEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    // 3. Floating Orbital Particles
    const particles = Array.from({ length: 28 }, (_, i) => {
      const theta = (i / 28) * Math.PI * 2;
      const phiAngle = (Math.sin(i * 3.7) * Math.PI) / 3;
      return {
        r: 1.45 + (i % 4) * 0.15,
        speed: 0.012 + (i % 3) * 0.008,
        offset: theta,
        phiAngle,
        size: 1.5 + (i % 3),
        color: i % 2 === 0 ? "#ec4899" : "#06b6d4"
      };
    });

    const render = () => {
      time += 0.016;

      // Friction for manual rotation velocity
      if (!isDragging3D) {
        manualRot.current.x += rotVelocity.current.x;
        manualRot.current.y += rotVelocity.current.y;
        rotVelocity.current.x *= 0.94;
        rotVelocity.current.y *= 0.94;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.3;

      // 3D rotation angles combined from drag, mouse tilt, and auto spin
      const rx = manualRot.current.x + tilt.y * 0.7 + time * 0.3;
      const ry = manualRot.current.y + tilt.x * 0.7 + time * 0.45;

      const project = (x: number, y: number, z: number, rad = radius) => {
        let x1 = x * Math.cos(ry) + z * Math.sin(ry);
        let z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

        const fov = 3.4;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * rad * scale,
          y: cy + y2 * rad * scale,
          z: z2,
          scale,
        };
      };

      // ── Layer 1: Triple Gyroscopic Orbit Rings ──
      const ringSteps = 56;
      const drawRing = (tiltAngle: number, color: string, speedMult: number, ringRad = 1.35) => {
        ctx.beginPath();
        for (let i = 0; i <= ringSteps; i++) {
          const theta = (i / ringSteps) * Math.PI * 2;
          const rX = Math.cos(theta) * ringRad;
          const rY = Math.sin(theta) * Math.cos(tiltAngle + time * speedMult) * ringRad;
          const rZ = Math.sin(theta) * Math.sin(tiltAngle + time * speedMult) * ringRad;
          const p = project(rX, rY, rZ);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      };

      drawRing(0.5, "rgba(236, 72, 153, 0.45)", 0.5, 1.4);
      drawRing(-0.7, "rgba(139, 92, 246, 0.45)", -0.4, 1.35);
      drawRing(1.2, "rgba(6, 182, 212, 0.4)", 0.3, 1.45);

      // ── Layer 2: Outer Icosahedron Wireframe ──
      const projectedIco = icoVertices.map(([x, y, z]) => project(x, y, z));

      ctx.shadowBlur = 12;
      ctx.shadowColor = "#ec4899";
      icoEdges.forEach(([i, j]) => {
        const p1 = projectedIco[i];
        const p2 = projectedIco[j];
        const depthAlpha = Math.max(0.18, (p1.scale + p2.scale) / 2 - 0.35);

        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(236, 72, 153, ${depthAlpha * 0.95})`);
        grad.addColorStop(1, `rgba(139, 92, 246, ${depthAlpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      // Icosahedron Node Vertices
      projectedIco.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, 3.5 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? "#ffffff" : "#f472b6";
        ctx.fill();
      });

      // ── Layer 3: Inner Reversing Octahedron Crystal ──
      const innerRad = radius * 0.55;
      const projectedOct = octVertices.map(([x, y, z]) => {
        // Reverse spin for counter-rotation
        const revRx = -rx * 1.2;
        const revRy = -ry * 1.2;
        let x1 = x * Math.cos(revRy) + z * Math.sin(revRy);
        let z1 = -x * Math.sin(revRy) + z * Math.cos(revRy);
        let y2 = y * Math.cos(revRx) - z1 * Math.sin(revRx);
        let z2 = y * Math.sin(revRx) + z1 * Math.cos(revRx);

        const fov = 3.4;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * innerRad * scale,
          y: cy + y2 * innerRad * scale,
          scale
        };
      });

      ctx.shadowBlur = 8;
      ctx.shadowColor = "#06b6d4";
      octEdges.forEach(([i, j]) => {
        const p1 = projectedOct[i];
        const p2 = projectedOct[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(6, 182, 212, 0.75)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // ── Layer 4: Orbital Particle Starfield ──
      particles.forEach((part) => {
        const currentAngle = part.offset + time * part.speed;
        const pX = Math.cos(currentAngle) * Math.cos(part.phiAngle) * part.r;
        const pY = Math.sin(part.phiAngle) * part.r;
        const pZ = Math.sin(currentAngle) * Math.cos(part.phiAngle) * part.r;
        const p = project(pX, pY, pZ);

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, part.size * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = part.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = part.color;
        ctx.fill();
      });

      // ── Layer 5: Pulsing Center Core ──
      const centerScale = 1 + Math.sin(time * 3.5) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 7 * centerScale, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#f43f5e";
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [tilt, isDragging3D]);

  // ── Drag Controls for 3D Model ──
  const handleStartDrag = (clientX: number, clientY: number) => {
    setIsDragging3D(true);
    dragStart.current = { x: clientX, y: clientY };
  };
  const handleMoveDrag = (clientX: number, clientY: number) => {
    if (!isDragging3D) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    manualRot.current.y += dx * 0.009;
    manualRot.current.x += dy * 0.009;
    rotVelocity.current = { x: dy * 0.002, y: dx * 0.002 };
    dragStart.current = { x: clientX, y: clientY };
  };
  const handleEndDrag = () => setIsDragging3D(false);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={resetSection}
      className="relative bg-[#f8f7f4] text-[#121214] px-4 sm:px-8 md:px-14 pt-14 sm:pt-18 pb-16 sm:pb-24 md:pb-28 overflow-hidden font-['Outfit',sans-serif]"
    >
      {/* Background Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#121214 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* Ambient Gradient Glow Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#ec4899]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8b5cf6]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-14 items-center">
        
        {/* ── Left Side: Interactive 3D Hologram Centerpiece ── */}
        <div className="md:col-span-6 relative flex justify-center order-2 md:order-1">
          <div
            className="relative w-[300px] xs:w-[340px] sm:w-[390px] md:w-[440px] aspect-square transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x * 12}deg) rotateX(${-tilt.y * 12}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Glowing Hologram Base Pod */}
            <div className="absolute inset-4 bg-gradient-to-tr from-[#ec4899]/15 via-[#8b5cf6]/15 to-[#06b6d4]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Interactive 3D Model Canvas Container */}
            <div
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
              onMouseMove={(e) => handleMoveDrag(e.clientX, e.clientY)}
              onMouseUp={handleEndDrag}
              onMouseLeave={handleEndDrag}
              onTouchStart={(e) => handleStartDrag(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={handleEndDrag}
              style={{ transform: "translateZ(30px)" }}
            >
              <canvas
                ref={canvasRef}
                width={420}
                height={420}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(236,72,153,0.25)]"
              />
            </div>

            {/* Floating Tech Chip: Top Right */}
            <div
              className="absolute -top-1 right-2 sm:-top-2 sm:right-4 bg-white/95 backdrop-blur-md border border-[#121214]/10 rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-lg flex items-center gap-2 font-mono text-[10px] sm:text-[11.5px] font-medium z-20 pointer-events-none"
              style={{ transform: "translateZ(60px)" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="text-[#121214]">{'<TypeScript & Next.js 15 />'}</span>
            </div>

            {/* Floating Music/Lo-Fi Chip: Mid Left */}
            <div
              className="absolute top-1/3 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#121214]/10 rounded-2xl px-2.5 py-1.5 shadow-lg flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-medium z-20 pointer-events-none"
              style={{ transform: "translateZ(50px)" }}
            >
              <span>🔮</span>
              <span className="text-[#64748b]">AI &amp; Creative Code</span>
            </div>

            {/* 3D Drag Prompt Pill */}
            <div
              className="absolute bottom-2 right-4 bg-white/90 backdrop-blur-md border border-[#121214]/10 rounded-xl px-3 py-1 shadow-sm font-mono text-[10px] text-[#71717a] flex items-center gap-1.5 pointer-events-none"
              style={{ transform: "translateZ(45px)" }}
            >
              <span className="text-[#ec4899]">✦</span>
              <span>drag to rotate 3D</span>
            </div>

            {/* Rotating Circular Badge Orbiting the 3D Core */}
            <div
              onMouseMove={(e) => handleTilt(e, 18, 1.1)}
              onMouseLeave={resetTilt}
              className="absolute -left-4 -bottom-4 sm:-left-6 sm:-bottom-6 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 transition-transform duration-200 ease-out will-change-transform cursor-pointer z-30"
              style={{ transform: "translateZ(70px)", transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow">
                <defs>
                  <path
                    id="heroBadgeCircle"
                    d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                  />
                </defs>
                <text fill="#121214" fontSize="8.8" fontWeight="600" letterSpacing="1.8">
                  <textPath href="#heroBadgeCircle" startOffset="0%">
                    ✦ FULL-STACK DEV ✦ CREATIVE CODER ✦
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#121214] text-white text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(18,18,20,0.35)]">
                  <span>DEV</span>
                  <span className="text-[#f472b6]">✦</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Right Side: Text, Magnetic CTAs & Feature Highlights ── */}
        <div
          className="md:col-span-6 text-center md:text-left transition-transform duration-300 ease-out will-change-transform order-1 md:order-2"
          style={{ transform: `translate(${tilt.x * -7}px, ${tilt.y * -5}px)` }}
        >
          {/* Status Indicator Chip */}
          <div className="inline-flex items-center gap-2 bg-white/90 border border-[#121214]/10 px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
            </span>
            <span className="font-mono text-xs text-[#52525b]">
              status: <strong className="text-[#121214]">online & shipping code</strong>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.3rem] font-bold tracking-tight text-[#121214] leading-[1.12]">
            Engineering <span className="bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">elegant apps</span> with logic & aesthetic flair.
          </h1>

          <p className="mt-4 sm:mt-6 text-[#52525b] text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0 font-normal">
            Hi, I’m a full-stack engineer and creative technologist who loves crafting 
            lightning-fast web apps, interactive 3D micro-animations, and clean architectures.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3.5 sm:gap-4">
            <a
              href="#about"
              onMouseMove={(e) => handleTilt(e, 10, 1.04)}
              onMouseLeave={resetTilt}
              className="inline-flex items-center justify-center gap-2 bg-[#121214] text-white px-7 py-3.5 rounded-2xl text-sm font-medium shadow-[0_8px_20px_-4px_rgba(18,18,20,0.3)] hover:bg-black transition-all will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span>Explore My World</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" /><path d="M8 7h9v9" />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={(e) => handleTilt(e, 8, 1.03)}
              onMouseLeave={resetTilt}
              className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#121214] border border-[#121214]/15 px-6 py-3.5 rounded-2xl text-sm font-medium transition-all shadow-sm will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="font-mono text-xs text-[#8b5cf6]">&lt;/&gt;</span>
              <span>Resume</span>
            </a>
          </div>

          {/* Clean Tech Stats / Arsenal Highlights */}
          <div className="mt-10 pt-6 border-t border-[#121214]/8 grid grid-cols-3 gap-3 text-center sm:text-left">
            <div>
              <div className="font-mono text-lg font-bold text-[#121214]">99+</div>
              <div className="text-xs text-[#71717a] font-mono">Lighthouse Score</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-[#ec4899]">60 FPS</div>
              <div className="text-xs text-[#71717a] font-mono">Fluid 3D Motion</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-[#8b5cf6]">100%</div>
              <div className="text-xs text-[#71717a] font-mono">TypeScript Native</div>
            </div>
          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
}