import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['https://srikanthkondapaka-portfolio.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB: UserMessages'))
    .catch(err => console.error('MongoDB connection error:', err));

// Message Schema
const messageSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Skill Schema
const skillSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    level: { type: Number, required: true },
    color: { type: String, required: true },
    cat: { type: String, required: true },
    iconName: { type: String, required: true } // Name of Lucide icon
});

const Skill = mongoose.model('Skill', skillSchema);

// Project Schema
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

const Project = mongoose.model('Project', projectSchema);

// Auth Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Routes - Messages
app.get('/api/messages', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;
        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newMessage = new Message({ fullName, email, subject, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact Form Save Error:', error);
        res.status(500).json({
            error: 'Server error',
            details: error.message
        });
    }
});

app.delete('/api/messages/:id', authMiddleware, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Routes - Skills
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        console.error('Skills Fetch Error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.post('/api/skills', authMiddleware, async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/skills/:id', authMiddleware, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Routes - Projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('Projects Fetch Error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

app.post('/api/projects', authMiddleware, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/test-db', async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };
        res.json({
            status: states[state],
            database: mongoose.connection.name,
            uri: process.env.MONGODB_URI ? 'Defined (Hidden for safety)' : 'NOT DEFINED'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Portfolio Backend is running');
});

// Admin Login Route
app.post('/api/login', (req, res) => {
    const { email, password, secretKey } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminSecretKey = process.env.ADMIN_SECRET_KEY;

    if (
        email === adminEmail &&
        password === adminPassword &&
        secretKey === adminSecretKey
    ) {
        const token = jwt.sign(
            { role: 'admin' },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );
        return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
