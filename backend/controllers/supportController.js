import Groq from "groq-sdk";
import SupportRequest from "../models/SupportRequest.js";
//import nodemailer from "nodemailer";

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
          content: `Patient Issue: ${issue}\nUrgency Level: ${urgency}\nProvide short triage advice in 3 lines.`,
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

    // 🔹 EMAIL TRANSPORTER
    {/* const transporter = nodemailer.createTransport({
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



    // 🔹 EMAIL TEMPLATE
    const mailOptions = {
      from: `"Chikitsak Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Support Request - Chikitsak",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2E7D32;">Hello ${name},</h2>
          <p>Thank you for reaching out to <strong>Chikitsak</strong>.</p>
          
          <h3>Your Submitted Issue:</h3>
          <p>${issue}</p>
          
          <h3>Urgency Level:</h3>
          <p>${urgency}</p>
          
          <h3>AI Health Summary:</h3>
          <div style="background:#f4f4f4;padding:15px;border-radius:8px;">
            ${aiSummary.replace(/\n/g, "<br/>")}
          </div>

          <p style="margin-top:20px;">
            ⚠️ This advice is informational and not a medical diagnosis.
          </p>

          <p style="margin-top:30px;">
            Stay healthy,<br/>
            <strong>Team Chikitsak</strong>
          </p>
        </div>
      `,
    };

    // 🔹 SEND EMAIL
    await transporter.sendMail(mailOptions);

    res.json({
      message: "Submitted successfully & email sent",
      aiSummary,
    });
  } catch (error) {
    console.error("Support Error:", error.message);
    res.status(500).json({ error: error.message });
  } */}
};
