const mongoose = require('mongoose');

// Your live database connection string
const dbURI = "mongodb+srv://mohanasrinivas08_db_user:Mohana%40123@cluster0.rnyjsb5.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

// Define the schema just for this script
const projectSchema = new mongoose.Schema({
    title: String,
    role: String,
    description: String,
    techStack: [String],
    liveLink: String
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

// The details of your new AI project
const newProject = new Project({
    title: "AI Research Assistant",
    role: "AI / Full Stack Developer",
    description: "An intelligent web application powered by AI designed to help users gather, analyze, and summarize research information efficiently.",
    techStack: ["React", "Node.js", "AI/LLM", "Render"],
    liveLink: "https://ai-research-assistant-qjox.onrender.com/"
});

// Connect, save, and exit
mongoose.connect(dbURI)
    .then(async () => {
        console.log("⏳ Connected to Live Database...");
        await newProject.save();
        console.log("✅ BOOM! Project Added Successfully!");
        process.exit(0);
    })
    .catch(err => {
        console.log("❌ Error:", err);
        process.exit(1);
    });
