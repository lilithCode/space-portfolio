import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "hamnamubarak.contact@gmail.com",
        subject: `Contact Form Submission from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Resend API Error:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }
  }

  res.setHeader("Allow", ["POST", "OPTIONS"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
