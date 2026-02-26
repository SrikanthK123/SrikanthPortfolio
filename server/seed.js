import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserMessages';

const skillSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    level: { type: Number, required: true },
    color: { type: String, required: true },
    cat: { type: String, required: true },
    iconName: { type: String, required: true }
});

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String }],
    links: [{
        type: { type: String, enum: ['github', 'link', 'private', 'live'] },
        label: String,
        url: String
    }],
    createdAt: { type: Date, default: Date.now }
});

const Skill = mongoose.model('Skill', skillSchema);
const Project = mongoose.model('Project', projectSchema);

const skillsData = [
    { skill: "JavaScript", level: 95, color: "#F7DF1E", cat: "Languages", iconName: "Code2" },
    { skill: "Python", level: 90, color: "#3776AB", cat: "Languages", iconName: "Terminal" },
    { skill: "Java", level: 85, color: "#007396", cat: "Languages", iconName: "Coffee" },
    { skill: "C", level: 80, color: "#A8B9CC", cat: "Languages", iconName: "Terminal" },
    { skill: "SQL (Postgres)", level: 90, color: "#336791", cat: "Languages", iconName: "Database" },
    { skill: "MongoDB", level: 85, color: "#47A248", cat: "Languages", iconName: "Database" },
    { skill: "HTML/CSS", level: 95, color: "#E34F26", cat: "Languages", iconName: "Layout" },
    { skill: "Tailwind", level: 95, color: "#38B2AC", cat: "Languages", iconName: "Wind" },
    { skill: "React", level: 90, color: "#61DAFB", cat: "Frameworks", iconName: "Atom" },
    { skill: "Next.js", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "Rocket" },
    { skill: "Node.js", level: 85, color: "#68A063", cat: "Frameworks", iconName: "Server" },
    { skill: "Express.js", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "Zap" },
    { skill: "Django", level: 80, color: "#092E20", cat: "Frameworks", iconName: "FileCode" },
    { skill: "Scikit-learn", level: 80, color: "#F7931E", cat: "Frameworks", iconName: "LineChart" },
    { skill: "TensorFlow", level: 75, color: "#FF6F00", cat: "Frameworks", iconName: "Brain" },
    { skill: "Keras", level: 75, color: "#D00000", cat: "Frameworks", iconName: "Brain" },
    { skill: "PySpark", level: 80, color: "#E25A1C", cat: "Frameworks", iconName: "Flame" },
    { skill: "SparkSQL", level: 80, color: "#E25A1C", cat: "Frameworks", iconName: "Database" },
    { skill: "LangChain", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "LinkIcon" },
    { skill: "LLMs (Ollama)", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "Bot" },
    { skill: "Git", level: 90, color: "#F05032", cat: "Tools", iconName: "Github" },
    { skill: "VS Code", level: 95, color: "#007ACC", cat: "Tools", iconName: "Monitor" },
    { skill: "PyCharm", level: 85, color: "#21D789", cat: "Tools", iconName: "FileCode" },
    { skill: "IntelliJ", level: 85, color: "#FE315D", cat: "Tools", iconName: "FileCode" },
    { skill: "Eclipse", level: 75, color: "#2C2255", cat: "Tools", iconName: "Monitor" },
    { skill: "Office (Excel/Word)", level: 90, color: "#2B579A", cat: "Tools", iconName: "FileText" },
    { skill: "Outlook", level: 85, color: "#0078D4", cat: "Tools", iconName: "Mail" },
    { skill: "GenAI", level: 90, color: "#FF4B4B", cat: "AI/Data", iconName: "Sparkles" },
    { skill: "Vibe coding", level: 95, color: "#9B59B6", cat: "AI/Data", iconName: "Music" },
    { skill: "AI Agents", level: 85, color: "#F1C40F", cat: "AI/Data", iconName: "Bot" },
    { skill: "AppWrite", level: 80, color: "#F02D65", cat: "AI/Data", iconName: "Database" },
    { skill: "Azure", level: 85, color: "#0089D6", cat: "AI/Data", iconName: "Cloud" },
    { skill: "Azure Data Factory", level: 80, color: "#0089D6", cat: "AI/Data", iconName: "Layers" },
    { skill: "Azure Databricks", level: 85, color: "#FF3621", cat: "AI/Data", iconName: "Box" },
    { skill: "Azure Data Lake", level: 80, color: "#0089D6", cat: "AI/Data", iconName: "Waves" },
    { skill: "Delta Lake", level: 80, color: "#0089D6", cat: "AI/Data", iconName: "Database" },
];

const projectsData = [
    {
        title: "Moral_Verse",
        description: "AI-Driven Positive Network for moral quote posters. It features real-time updates and intelligent content moderation.",
        tech: ["React", "Node.js", "MongoDB", "Express", "GitHub"],
        links: [
            { type: 'live', label: 'Live', url: 'https://moral-verse.vercel.app' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/MoralVerse' }
        ]
    },
    {
        title: "Budget Chef AI",
        description: "AI-powered recipe assistant that generates meals based on user budget and available ingredients.",
        tech: ["React", "Node.js", "Express", "Gemini API", "Tailwind CSS"],
        links: [
            { type: 'live', label: 'Live', url: 'https://budget-chef-ai.vercel.app' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/budget-chef-ai' }
        ]
    },
    {
        title: "SriAI – Smart AI Assistant",
        description: "AI-driven web application that provides intelligent responses and dynamic content generation.",
        tech: ["React", "Node.js", "Express", "Gemini API", "MongoDB"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanth-ai-chat.lovable.app/' }
        ]
    },
    {
        title: "Sri-Vision-AI",
        description: "AI-powered image analysis system that processes visual inputs using machine learning models.",
        tech: ["React", "TensorFlow", "Node.js", "Express", "Gemini Vision API"],
        links: [
            { type: 'live', label: 'Live', url: 'https://sri-vision-ai.lovable.app/' }
        ]
    },
    {
        title: "AI-Power Guess (Drawing Recognition)",
        description: "Interactive AI drawing recognition application that predicts user sketches in real-time.",
        tech: ["React", "TensorFlow.js", "Node.js", "Canvas API", "Gemini API"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/AIGuess/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/AIGuess' }
        ]
    },
    {
        title: "Cinema – Movie Discovery Platform",
        description: "Responsive movie browsing platform that allows users to explore trending and latest films.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/FilmZone/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/FilmZone' }
        ]
    },
    {
        title: "ExploreIndia – Virtual Travel Experience",
        description: "Interactive web platform that showcases India's diverse culture and destinations.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/ExploreIndia/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/ExploreIndia' }
        ]
    },
    {
        title: "SriStore – E-Commerce Platform",
        description: "Modern online shopping interface offering a smooth product browsing experience.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/SriStore/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/SriStore' }
        ]
    },
    {
        title: "Explore Universe – Space Exploration Web App",
        description: "Visually engaging web application that presents fascinating insights about space and galaxies.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/EarthDiscover/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/EarthDiscover' }
        ]
    },
    {
        title: "Food Zone – Interactive Food Experience",
        description: "Responsive ReactJS web application showcasing engaging food-themed content with modern UI.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://tastyzone.netlify.app/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/FoodZone' }
        ]
    },
    {
        title: "Music World – Movie Songs Platform",
        description: "Dynamic ReactJS platform featuring a curated collection of movie songs.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/MusicTime/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/MusicTime' }
        ]
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await Skill.deleteMany({});
        await Project.deleteMany({});

        await Skill.insertMany(skillsData);
        await Project.insertMany(projectsData);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
