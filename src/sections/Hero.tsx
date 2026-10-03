"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDragging3D, setIsDragging3D] = useState(false);

  // Refs so the canvas loop reads live values without restarting on every mouse move
  const tiltRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const manualRot = useRef({ x: 0.35, y: 0.55 });
  const rotVelocity = useRef({ x: 0, y: 0 });

  // ── Cursor Parallax Depth ──
  const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltRef.current = { x, y };
    setTilt({ x, y });
  };
  const resetSection = () => {
    tiltRef.current = { x: 0, y: 0 };
    setTilt({ x: 0, y: 0 });
  };

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

  // ── Real-Time 3D Model Canvas (pink palette) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // 1. Icosahedron outer shell
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
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

    // 2. Inner octahedron
    const octVertices = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1],
    ];
    const octEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2],
    ];

    // 3. Orbital particles
    const particles = Array.from({ length: 28 }, (_, i) => {
      const theta = (i / 28) * Math.PI * 2;
      const phiAngle = (Math.sin(i * 3.7) * Math.PI) / 3;
      return {
        r: 1.45 + (i % 4) * 0.15,
        speed: 0.012 + (i % 3) * 0.008,
        offset: theta,
        phiAngle,
        size: 1.5 + (i % 3),
        color: i % 2 === 0 ? "#e83e8c" : "#ff9cc9",
      };
    });

    const render = () => {
      time += 0.016;
      const tiltNow = tiltRef.current;

      if (!draggingRef.current) {
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

      const rx = manualRot.current.x + tiltNow.y * 0.7 + time * 0.3;
      const ry = manualRot.current.y + tiltNow.x * 0.7 + time * 0.45;

      const project = (x: number, y: number, z: number, rad = radius) => {
        const x1 = x * Math.cos(ry) + z * Math.sin(ry);
        const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

        const fov = 3.4;
        const scale = fov / (fov + z2);
        return { x: cx + x1 * rad * scale, y: cy + y2 * rad * scale, z: z2, scale };
      };

      // Layer 1: orbit rings
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

      drawRing(0.5, "rgba(232, 62, 140, 0.45)", 0.5, 1.4);
      drawRing(-0.7, "rgba(255, 122, 184, 0.5)", -0.4, 1.35);
      drawRing(1.2, "rgba(214, 51, 108, 0.4)", 0.3, 1.45);

      // Layer 2: icosahedron wireframe
      const projectedIco = icoVertices.map(([x, y, z]) => project(x, y, z));

      ctx.shadowBlur = 12;
      ctx.shadowColor = "#e83e8c";
      icoEdges.forEach(([i, j]) => {
        const p1 = projectedIco[i];
        const p2 = projectedIco[j];
        const depthAlpha = Math.max(0.18, (p1.scale + p2.scale) / 2 - 0.35);

        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(232, 62, 140, ${depthAlpha * 0.95})`);
        grad.addColorStop(1, `rgba(255, 122, 184, ${depthAlpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      projectedIco.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, 3.5 * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? "#e83e8c" : "#ff9cc9";
        ctx.fill();
      });

      // Layer 3: counter-rotating inner octahedron
      const innerRad = radius * 0.55;
      const projectedOct = octVertices.map(([x, y, z]) => {
        const revRx = -rx * 1.2;
        const revRy = -ry * 1.2;
        const x1 = x * Math.cos(revRy) + z * Math.sin(revRy);
        const z1 = -x * Math.sin(revRy) + z * Math.cos(revRy);
        const y2 = y * Math.cos(revRx) - z1 * Math.sin(revRx);
        const z2 = y * Math.sin(revRx) + z1 * Math.cos(revRx);

        const fov = 3.4;
        const scale = fov / (fov + z2);
        return { x: cx + x1 * innerRad * scale, y: cy + y2 * innerRad * scale, scale };
      });

      ctx.shadowBlur = 8;
      ctx.shadowColor = "#ff7ab8";
      octEdges.forEach(([i, j]) => {
        const p1 = projectedOct[i];
        const p2 = projectedOct[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(214, 51, 108, 0.75)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Layer 4: orbital particles
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

      // Layer 5: pulsing core
      const centerScale = 1 + Math.sin(time * 3.5) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 7 * centerScale, 0, Math.PI * 2);
      ctx.fillStyle = "#e83e8c";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ff7ab8";
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Drag Controls for 3D Model ──
  const handleStartDrag = (clientX: number, clientY: number) => {
    draggingRef.current = true;
    setIsDragging3D(true);
    dragStart.current = { x: clientX, y: clientY };
  };
  const handleMoveDrag = (clientX: number, clientY: number) => {
    if (!draggingRef.current) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    manualRot.current.y += dx * 0.009;
    manualRot.current.x += dy * 0.009;
    rotVelocity.current = { x: dy * 0.002, y: dx * 0.002 };
    dragStart.current = { x: clientX, y: clientY };
  };
  const handleEndDrag = () => {
    draggingRef.current = false;
    setIsDragging3D(false);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleSectionMove}
      onMouseLeave={resetSection}
      className="relative bg-gradient-to-b from-[#fff0f7] to-[#fffafc] text-[#2a1a26] px-4 sm:px-8 md:px-14 pt-24 sm:pt-32 pb-16 sm:pb-24 md:pb-28 overflow-hidden font-['Outfit',sans-serif]"
    >
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#e83e8c 0.8px, transparent 0.8px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient pink glow blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#e83e8c]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ff7ab8]/20 rounded-full blur-3xl pointer-events-none" />

      {/* No order classes: the 3D model comes first in the page, so it is at the top on phones */}
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-12 gap-6 md:gap-12 lg:gap-14 items-center">

        {/* ── 3D model: small and on top on phones ── */}
        <div className="md:col-span-6 relative flex justify-center">
          <div
            className="relative w-[250px] sm:w-[340px] md:w-[440px] aspect-square transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x * 12}deg) rotateX(${-tilt.y * 12}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Decorative layers: pushed behind the canvas in 3D space, no backdrop-blur */}
            <div
              className="absolute inset-2 pointer-events-none"
              style={{ transform: "translateZ(-30px)" }}
            >
              <div
                className="w-full h-full rounded-full opacity-70 blur-xl animate-spin-slower"
                style={{
                  background:
                    "conic-gradient(from 0deg, #ffd1e6, #ffffff, #ff9cc9, #ffffff, #ffd1e6)",
                }}
              />
            </div>

            <div
              className="absolute inset-5 rounded-full border border-white/80 pointer-events-none"
              style={{
                transform: "translateZ(-20px)",
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), rgba(255,214,232,0.35) 70%)",
                boxShadow:
                  "inset 0 0 40px rgba(232,62,140,0.12), 0 20px 50px rgba(232,62,140,0.15)",
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none"
              style={{ transform: "translateZ(-10px)" }}
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#e83e8c]/35 animate-spin-slower" />
            </div>

            {/* Interactive canvas */}
            <div
              className={`relative z-10 w-full h-full flex items-center justify-center select-none ${
                isDragging3D ? "cursor-grabbing" : "cursor-grab"
              }`}
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
                className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(232,62,140,0.25)]"
              />
            </div>

            {/* Chip: top right (outer div = position and depth, inner div = float) */}
            <div
              className="absolute -top-1 right-0 sm:-top-2 sm:right-4 z-20 pointer-events-none"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="animate-float bg-white/95 border border-[#e83e8c]/20 rounded-2xl px-2.5 py-1 sm:px-3.5 sm:py-2 shadow-lg flex items-center gap-2 font-mono text-[9px] sm:text-[11.5px] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#e83e8c] animate-ping" />
                <span className="text-[#2a1a26]">{"<Python & OpenCV />"}</span>
              </div>
            </div>

            {/* Chip: mid left */}
            <div
              className="absolute top-1/3 -left-2 sm:-left-6 z-20 pointer-events-none"
              style={{ transform: "translateZ(50px)" }}
            >
              <div
                className="animate-float bg-white/95 border border-[#e83e8c]/20 rounded-2xl px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-lg flex items-center gap-1.5 font-mono text-[9px] sm:text-[11px] font-medium"
                style={{ animationDelay: "1.3s" }}
              >
                <span>🌸</span>
                <span className="text-[#7a6572]">Computer Vision &amp; SQL</span>
              </div>
            </div>

            {/* Drag prompt */}
            <div
              className="absolute bottom-1 right-2 sm:bottom-2 sm:right-4 z-20 pointer-events-none"
              style={{ transform: "translateZ(45px)" }}
            >
              <div
                className="animate-float bg-white/90 border border-[#e83e8c]/20 rounded-xl px-2.5 py-1 shadow-sm font-mono text-[9px] sm:text-[10px] text-[#7a6572] flex items-center gap-1.5"
                style={{ animationDelay: "2.6s" }}
              >
                <span className="text-[#e83e8c]">✦</span>
                <span>drag to rotate 3D</span>
              </div>
            </div>

            {/* Rotating circular name badge */}
            <div
              onMouseMove={(e) => handleTilt(e, 18, 1.1)}
              onMouseLeave={resetTilt}
              className="absolute -left-1 -bottom-3 sm:-left-6 sm:-bottom-6 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 transition-transform duration-200 ease-out will-change-transform cursor-pointer z-30"
              style={{ transform: "translateZ(70px)", transformStyle: "preserve-3d" }}
            >
              <svg viewBox="0 0 120 120" className="w-full h-full animate-spin-slow overflow-visible">
                <defs>
                  <path
                    id="heroBadgeCircle"
                    d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                  />
                </defs>
                {/* textLength = circle circumference, so the words spread evenly all the way round */}
                <text fill="#e83e8c" fontSize="9" fontWeight="600">
                  <textPath
                    href="#heroBadgeCircle"
                    startOffset="0"
                    textLength="285"
                    lengthAdjust="spacing"
                  >
                    ✦ DEVISHA AGRAWAL ✦ DEVELOPER ✦
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#e83e8c] to-[#ff7ab8] text-white text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(232,62,140,0.35)]">
                  <span>DA</span>
                  <span>✦</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Text, CTAs, highlights ── */}
        <div
          className="md:col-span-6 text-center md:text-left transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translate(${tilt.x * -7}px, ${tilt.y * -5}px)` }}
        >
          {/* Logo lockup: small screens only, sits under the model and before the text */}
          <a
            href="#home"
            className="md:hidden inline-flex items-center gap-3 mb-5 mt-2"
            aria-label="Devisha Agrawal"
          >
            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e83e8c] to-[#ff7ab8] text-white text-lg font-bold flex items-center justify-center shadow-[0_8px_20px_rgba(232,62,140,0.35)]">
              DA
            </span>
            <span className="text-left leading-tight">
              <span className="block text-lg font-bold text-[#2a1a26]">Devisha Agrawal</span>
              <span className="block font-mono text-xs text-[#e83e8c]">Developer</span>
            </span>
          </a>

          {/* Status chip */}
          <div className="flex md:inline-flex w-fit mx-auto md:mx-0 items-center gap-2 bg-white/90 border border-[#e83e8c]/20 px-3.5 py-1.5 rounded-full mb-5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e83e8c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e83e8c]" />
            </span>
            <span className="font-mono text-xs text-[#7a6572]">
              status: <strong className="text-[#2a1a26]">open to opportunities</strong>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.3rem] font-bold tracking-tight text-[#2a1a26] leading-[1.12]">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-[#e83e8c] to-[#ff7ab8] bg-clip-text text-transparent">
              Devisha Agrawal
            </span>
            . I build things with code.
          </h1>

          <p className="mt-4 sm:mt-6 text-[#7a6572] text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0 font-normal">
            I’m a developer who enjoys turning ideas into working software, from
            computer vision projects to clean, usable web apps.
          </p>

          {/* Buttons */}
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3.5 sm:gap-4">
            <a
              href="#projects"
              onMouseMove={(e) => handleTilt(e, 10, 1.04)}
              onMouseLeave={resetTilt}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#e83e8c] to-[#ff7ab8] text-white px-7 py-3.5 rounded-2xl text-sm font-medium shadow-[0_8px_20px_-4px_rgba(232,62,140,0.4)] hover:brightness-105 transition-all will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span>View my work</span>
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
              className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#2a1a26] border border-[#e83e8c]/25 px-6 py-3.5 rounded-2xl text-sm font-medium transition-all shadow-sm will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="font-mono text-xs text-[#e83e8c]">&lt;/&gt;</span>
              <span>Resume</span>
            </a>
          </div>

          {/* Stats: replace with your own numbers */}
          <div className="mt-10 pt-6 border-t border-[#e83e8c]/15 grid grid-cols-3 gap-3 text-center sm:text-left">
            <div>
              <div className="font-mono text-lg font-bold text-[#2a1a26]">1+</div>
              <div className="text-xs text-[#7a6572] font-mono">Hackathon projects</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-[#e83e8c]">5+</div>
              <div className="text-xs text-[#7a6572] font-mono">Projects built</div>
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-[#ff7ab8]">100%</div>
              <div className="text-xs text-[#7a6572] font-mono">Curiosity</div>
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
        .animate-spin-slower {
          animation: spin-slow 28s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow,
          .animate-spin-slower,
          .animate-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}