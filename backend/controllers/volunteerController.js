import Volunteer from "../models/Volunteer.js";
import Groq from "groq-sdk";
import nodemailer from "nodemailer";

export const registerVolunteer = async (req, res) => {
  try {
    const { fullName, email, phone, skills, availability, location } = req.body;

    if (!fullName || !email || !skills || !availability) {
      return res.status(400).json({ error: "Required fields missing" });
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
            "You are a professional healthcare volunteer coordinator. Evaluate volunteers and suggest best role and response should be professional.",
        },
        {
          role: "user",
          content: `
            Skills: ${skills}
            Availability: ${availability}
            Location: ${location}
            Provide:
            1. Best suited volunteer role
            2. Short evaluation (2-3 lines)
          `,
        },
      ],
      temperature: 0.5,
    });

    const aiEvaluation = completion.choices[0].message.content;

    // 🔹 Save to DB
    const volunteer = new Volunteer({
      fullName,
      email,
      phone,
      skills,
      availability,
      location,
      aiEvaluation,
    });

    await volunteer.save();

    // 🔹 Send Response Immediately (IMPORTANT)
    res.json({
      success: true,
      aiEvaluation,
    });

    // 🔹 Send Email (Non-blocking)
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
        from: `"Chikitsak Volunteer Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Volunteer Registration - Chikitsak",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hello ${fullName},</h2>
            <p>Thank you for registering with Chikitsak.</p>
            <h3>AI Evaluation:</h3>
            <div style="background:#f4f4f4;padding:15px;border-radius:8px;">
              ${aiEvaluation.replace(/\n/g, "<br/>")}
            </div>
            <p>Regards,<br/>Chikitsak Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

  } catch (error) {
    console.error("Volunteer Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

