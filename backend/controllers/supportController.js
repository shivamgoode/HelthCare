import Groq from "groq-sdk";
import SupportRequest from "../models/SupportRequest.js";
import nodemailer from "nodemailer";

export const submitSupport = async (req, res) => {
  try {
    const { name, email, issue, urgency } = req.body;

    if (!name || !email || !issue || !urgency) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 🔹 GROQ AI
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a professional healthcare triage assistant. Provide safe and non-diagnostic advice.",
        },
        {
          role: "user",
          content: `Patient Issue: ${issue}
Urgency Level: ${urgency}
Provide short triage advice in 3 lines.`,
        },
      ],
      temperature: 0.5,
    });

    const aiSummary = completion.choices[0].message.content;

    // 🔹 Save to Database
    const newRequest = new SupportRequest({
      name,
      email,
      issue,
      urgency,
      aiSummary,
    });

    await newRequest.save();

    // ✅ SEND RESPONSE TO FRONTEND IMMEDIATELY
    res.json({
      success: true,
      aiSummary,
    });

    // 🔹 SEND EMAIL (NON-BLOCKING)
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: `"Chikitsak Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Support Request - Chikitsak",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hello ${name},</h2>
            <p>Thank you for reaching out to Chikitsak.</p>
            <h3>AI Health Summary:</h3>
            <div style="background:#f4f4f4;padding:15px;border-radius:8px;">
              ${aiSummary.replace(/\n/g, "<br/>")}
            </div>
            <p style="margin-top:20px;">
              ⚠️ This advice is informational and not a medical diagnosis.
            </p>
            <p>Stay healthy,<br/>Team Chikitsak</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

  } catch (error) {
    console.error("Support Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
