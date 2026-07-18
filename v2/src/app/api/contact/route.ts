  import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const isKeyConfigured = apiKey && apiKey !== "re_your_api_key_here";

    if (!isKeyConfigured) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "\n[CONTACT API - DEMO/DEV MODE]\n" +
          "RESEND_API_KEY is not configured or uses the default placeholder.\n" +
          "Logging message to console instead of sending email:\n" +
          `- Name: ${name}\n` +
          `- Email: ${email}\n` +
          `- Message: ${message}\n` +
          "To enable real email sending, set a valid RESEND_API_KEY in your .env.local file.\n"
        );
        return NextResponse.json({ success: true, isDemoMode: true });
      }

      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Contact service is currently not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "bhargavbhathosmane321@gmail.com",
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Contact API Server Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
