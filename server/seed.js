const mongoose = require('mongoose');
const Project = require('./models/Project');

// ✅ CHECK YOUR PASSWORD HERE (Replace %40 if needed)
const dbURI = "mongodb+srv://mohanasrinivas08_db_user:Mohana%40123@cluster0.rnyjsb5.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI)
  .then(() => console.log("✅ Connected to Atlas (Portfolio DB)..."))
  .catch(err => console.log("❌ Connection Error:", err));

const projects = [
  {
    title: "Cloak Room Management System",
    description: "A full-stack luggage management system. Handled UI design, database architecture, and deployment.",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    liveLink: "https://cloak-room-management.onrender.com/",
    role: "Team Leader",
    category: "MERN Stack",
    // 🧳 Luggage Icon
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Secure Authentication Portfolio",
    description: "Secure MERN-stack app with role-based auth and password encryption.",
    techStack: ["React", "Node.js", "JWT", "Bcrypt"],
    liveLink: "https://mohana-protofolio.onrender.com/login",
    role: "Individual Project",
    category: "MERN Stack",
    // 🔒 Security Icon
    image: "https://images.unsplash.com/photo-1614064641938-3e858a915a3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Emotion Based Music Recommendation",
    description: "Analyzes facial expressions to recommend music. Achieved 90% accuracy.",
    techStack: ["Python", "OpenCV", "Scikit-learn"],
    liveLink: "https://rb.gy/jufqbs",
    role: "Team Leader",
    category: "AI / ML",
    // 🎧 Music Icon
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  }
];

const seedDB = async () => {
  try {
    await Project.deleteMany({});
    console.log("🗑️  Old data cleared.");
    await Project.insertMany(projects);
    console.log("✅ Database Updated with Images!");
    mongoose.connection.close();
  } catch (err) {
    console.log("❌ Seeding Failed:", err);
  }
};

seedDB();