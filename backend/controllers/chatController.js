import Groq from "groq-sdk";

export const chatWithAI = async (req, res) => {
  try {
    console.log("Body received:", req.body);

    if (!req.body || typeof req.body.message !== "string") {
      return res.status(400).json({ error: "Message must be a string" });
    }

    const message = req.body.message.trim();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ valid model
      messages: [
        {
          role: "system",
          content: "You are a helpful healthcare assistant. Give safe advice.",
        },
        {
          role: "user",
          content: message, // ✅ guaranteed string
        },
      ],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("Groq Chat Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};
