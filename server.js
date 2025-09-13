import express from "express";
import cors from "cors";
import { Resend } from "resend";
import "dotenv/config";
import process from "process";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields." });
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
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
