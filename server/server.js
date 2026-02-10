require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const Project = require('./models/Project');

// Middleware
app.use(cors());
app.use(express.json());

// ✅ DATABASE CONNECTION
const dbURI = "mongodb+srv://mohanasrinivas08_db_user:Mohana%40123@cluster0.rnyjsb5.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ✅ GEMINI AI SETUP
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🛠️ FIX: Using 'gemini-flash-latest' because it was in your allowed list
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

// Context: This tells the AI who you are!
const PORTFOLIO_CONTEXT = `
You are an AI assistant for Panadi Mohana Venkata Srinivas's portfolio website.
Your goal is to answer visitor questions professionally and concisely based on his details.

DETAILS:
- Name: Panadi Mohana Venkata Srinivas
- Role: Full Stack Developer & AI Enthusiast
- Education: B.Tech in CSE from Krishna University (Distinction, 8.53 CGPA).
- Skills: Python, Java, MERN Stack (MongoDB, Express, React, Node.js), C++, AI/ML (OpenCV, Scikit-learn).
- Projects: 
  1. Cloak Room Management System (MERN Stack)
  2. Secure Authentication Portfolio (MERN, JWT, Bcrypt)
  3. Emotion Based Music Recommendation (Python, AI)
- Internships: 
  1. DataValley (Full Stack Web Dev)
  2. Blackbuck Engineers (AI/ML)
  3. VaultofCodes (Java)
  4. Pantech (Python)
- Contact: Email: mohanasrinivas08@gmail.com, Phone: +91 88 8645 1189.

INSTRUCTIONS:
- If the answer is not in this list, say "I don't have that specific info, but you can contact Mohana directly."
- Keep answers short and friendly.
- Do not mention you are a bot unless asked.
`;

// --- ROUTES ---

// 1. Get Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Chat with AI Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) return res.status(400).json({ reply: "Please say something!" });

    const prompt = `${PORTFOLIO_CONTEXT}\n\nUser: ${message}\nAssistant:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });
  } catch (error) {
    console.error("❌ AI Error Details:", error.message);
    
    // Check for quota limits specifically
    if (error.message.includes("429")) {
        return res.status(429).json({ reply: "I'm a bit overwhelmed right now (Rate Limit Reached). Please try again in a minute!" });
    }

    res.status(500).json({ 
      reply: "My AI brain is currently offline. Please contact Mohana directly!" 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));