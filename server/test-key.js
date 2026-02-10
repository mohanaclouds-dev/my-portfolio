require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    console.log("Checking available models...");
    // Fetches the list of all models your key can access
    const modelList = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey; 
    // Actually, let's use the correct list method:
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();

    if (data.error) {
        console.error("❌ API Key Error:", data.error.message);
    } else {
        console.log("✅ SUCCESS! Here are your available models:");
        data.models.forEach(m => console.log(` - ${m.name.replace('models/', '')}`));
    }
  } catch (error) {
    console.error("❌ Network Error:", error);
  }
}

listModels();