require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const Project = require('./models/Project');
const Visitor = require('./models/Visitor'); // Visitor model

// ==========================================
// 1. MIDDLEWARE (MUST BE AT THE TOP!)
// ==========================================
app.use(cors({
    origin: ["https://my-portfolio-1-98jw.onrender.com", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());


// ==========================================
// 2. DATABASE CONNECTION
// ==========================================
const dbURI = "mongodb+srv://mohanasrinivas08_db_user:Mohana%40123@cluster0.rnyjsb5.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));


// ==========================================
// 3. GEMINI AI SETUP
// ==========================================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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


// ==========================================
// 4. ROUTES
// ==========================================

// Route A: Visitor Counter
app.post('/api/visit', async (req, res) => {
    try {
        const { action } = req.body; 
        
        let visitorData = await Visitor.findOne({ name: 'portfolio_visits' });
        
        if (!visitorData) {
            visitorData = new Visitor({ name: 'portfolio_visits', count: 0 });
        }

        if (action === 'increment') {
            visitorData.count += 1;
            await visitorData.save();
        }

        res.json({ count: visitorData.count });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route B: Get Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route C: Chat with AI
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
    
    // 1. Catch the Rate Limit / Quota Error
    if (error.message.includes("429") || error.message.includes("Quota") || error.message.includes("limit")) {
        return res.json({ reply: "I'm receiving too many messages right now! Please wait about 30 seconds and ask me again." });
    }

    // 2. Catch the Google Server Overload Error
    if (error.message.includes("503") || error.message.includes("high demand")) {
        return res.json({ reply: "Google's AI servers are a bit overloaded at the moment. Please try asking me again in a minute!" });
    }

    res.status(500).json({ 
      reply: "My AI brain is currently offline. Please contact Mohana directly!" 
    });
  }
});


// ==========================================
// 5. START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
