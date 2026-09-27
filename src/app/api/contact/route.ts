
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,

      subject: `Portfolio Contact: ${name}`,

      text: `
New message from your portfolio.

Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #8b5cf6;">
            New Portfolio Contact
          </h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <hr />

          <h3>Message</h3>

          <p>
            ${message.replace(/\n/g, "<br />")}
          </p>

          <hr />

          <p style="color: #777; font-size: 12px;">
            Sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Nodemailer error:", error);

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

