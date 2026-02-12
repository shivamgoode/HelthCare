🧠 Chikitsak Frontend

Frontend application for **Chikitsak – Where Care Meets Contribution**, an AI-powered healthcare assistance platform that connects patients seeking help and volunteers willing to contribute.

Built using modern React architecture and a clean UI system, this frontend communicates with a Node.js backend that integrates Groq AI models.



 🌐 Overview

The frontend provides:

- 🤖 AI Chat Assistant (floating widget)
- 🩺 Patient Support Submission Form
- 🤝 Volunteer Registration Form
- 📩 AI-generated response display (Markdown formatted)
- Responsive and modern UI



 🚀 Features

🤖 AI Chat Assistant
- Floating open/close widget
- Animated transitions
- Real-time API integration
- Markdown-rendered AI responses
- Typing indicator
- Persistent message state (in-memory)

 🩺 Patient Support Form
- Name, email, issue description
- Urgency selection (Low / Medium / High)
- AI-generated triage summary
- Structured formatted response display

 🤝 Volunteer Registration
- Full volunteer profile submission
- AI-based role evaluation
- Clean response card
- Loading states

🎨 UI/UX Design
- Tailwind CSS styling
- Responsive layout
- Gradient accents
- Poppins typography
- Clean component architecture



 🛠️ Technology Stack

| Technology | Purpose |

| React.js | Frontend Framework |
| Tailwind CSS | Styling |
| Axios | API communication |
| React Markdown | Render AI responses |
| remark-gfm | GitHub Flavored Markdown support |
| Lucide React | Icons |






📘 BACKEND 

# 🧠 Chikitsak Backend

Backend server for "Chikitsak", an AI-powered healthcare assistance platform.

The backend handles:

- AI Chat processing
- Patient support triage
- Volunteer evaluation
- Database storage
- Automated email notifications

Built with Node.js, Express, MongoDB, and Groq AI.

---

 🌐 Overview

This backend provides:

- AI-powered triage advice
- Volunteer role evaluation
- Data persistence in MongoDB
- Automatic email notifications to users
- Secure environment-based configuration

---

🚀 Features

 🤖 AI Chat API
- Accepts user messages
- Sends prompts to Groq AI
- Returns formatted responses

 🩺 Support Submission API
- Accepts patient details
- Generates AI triage advice
- Saves data to database
- Sends automatic confirmation email

 🤝 Volunteer Registration API
- Accepts volunteer details
- AI evaluates suitable role
- Stores volunteer profile
- Sends evaluation email

 📩 Email Notification System
- Nodemailer integration
- HTML email templates
- Dynamic content insertion
- Professional formatting



🛠️ Technology Stack

| Technology | Purpose |

| Node.js | Runtime |
| Express.js | Server framework |
| MongoDB | Database |
| Mongoose | ODM |
| Groq SDK | AI model integration |
| Nodemailer | Email service |
| dotenv | Environment management |
| cors | Cross-origin support |
