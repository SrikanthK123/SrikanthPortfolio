import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, MessageSquare, Code2, Rocket, Plus, Trash2,
    ExternalLink, CheckCircle, AlertCircle, Loader2, Diamond, Send, LogOut
} from 'lucide-react';
import API_BASE_URL from '../config';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('messages');
    const [messages, setMessages] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Form states
    const [skillForm, setSkillForm] = useState({ skill: '', level: 90, color: '#3b82f6', cat: 'Languages', iconName: 'Code2' });
    const [projectForm, setProjectForm] = useState({ title: '', description: '', tech: '', github: '', live: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const getHeaders = () => {
        const token = localStorage.getItem('adminToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const headers = getHeaders();
            const [msgRes, skillRes, projRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/messages`, { headers }),
                fetch(`${API_BASE_URL}/api/skills`, { headers }),
                fetch(`${API_BASE_URL}/api/projects`, { headers })
            ]);

            const [msgData, skillData, projData] = await Promise.all([
                msgRes.json(),
                skillRes.json(),
                projRes.json()
            ]);

            setMessages(msgData);
            setSkills(skillData);
            setProjects(projData);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/${type}/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            if (res.ok) {
                fetchData();
            }
        } catch (err) {
            alert('Delete failed');
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/skills`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(skillForm)
            });
            if (res.ok) {
                setSkillForm({ skill: '', level: 90, color: '#3b82f6', cat: 'Languages', iconName: 'Code2' });
                fetchData();
            }
        } catch (err) {
            alert('Add skill failed');
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        const techArray = projectForm.tech.split(',').map(t => t.trim());
        const projectData = {
            title: projectForm.title,
            description: projectForm.description,
            tech: techArray,
            links: [
                { type: 'github', label: 'GitHub', url: projectForm.github },
                { type: 'live', label: 'Live', url: projectForm.live }
            ].filter(l => l.url)
        };

        try {
            const res = await fetch(`${API_BASE_URL}/api/projects`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(projectData)
            });
            if (res.ok) {
                setProjectForm({ title: '', description: '', tech: '', github: '', live: '' });
                fetchData();
            }
        } catch (err) {
            alert('Add project failed');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 px-4 pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="flex items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-widest mb-2">Admin Panel</h1>
                            <p className="text-gray-400">Manage your portfolio content and messages</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-3 rounded-xl border border-red-500/20 transition-all flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>

                    <div className="flex bg-[#0a0f1d] p-1 rounded-xl border border-white/5">
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${activeTab === 'messages' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <MessageSquare size={18} />
                            <span>Messages</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${activeTab === 'skills' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Code2 size={18} />
                            <span>Skills</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Rocket size={18} />
                            <span>Projects</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'messages' && (
                        <motion.div
                            key="messages"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-[#0a0f1d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Date</th>
                                            <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Name</th>
                                            <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Email</th>
                                            <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Subject</th>
                                            <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Message</th>
                                            <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {messages.map((msg) => (
                                            <tr key={msg._id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-white">{msg.fullName}</td>
                                                <td className="px-6 py-4 text-sm text-gray-400">{msg.email}</td>
                                                <td className="px-6 py-4 text-sm text-blue-400">{msg.subject}</td>
                                                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">{msg.message}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleDelete('messages', msg._id)}
                                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'skills' && (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            <div className="lg:col-span-1">
                                <form onSubmit={handleAddSkill} className="bg-[#0a0f1d] border border-white/10 p-8 rounded-2xl sticky top-32">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <Plus size={20} className="text-blue-500" />
                                        Add New Skill
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Skill Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={skillForm.skill}
                                                onChange={(e) => setSkillForm({ ...skillForm, skill: e.target.value })}
                                                className="w-full bg-[#0a0f1d] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Category</label>
                                            <select
                                                value={skillForm.cat}
                                                onChange={(e) => setSkillForm({ ...skillForm, cat: e.target.value })}
                                                className="w-full bg-[#0a0f1d] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                                            >
                                                <option value="Languages" className="bg-[#0f172a]">Languages</option>
                                                <option value="Frameworks" className="bg-[#0f172a]">Frameworks</option>
                                                <option value="Tools" className="bg-[#0f172a]">Tools</option>
                                                <option value="AI/Data" className="bg-[#0f172a]">AI/Data</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Proficiency %</label>
                                                <input
                                                    required
                                                    type="number"
                                                    min="1" max="100"
                                                    value={skillForm.level}
                                                    onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                                                    className="w-full bg-[#0a0f1d] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Color (Hex)</label>
                                                <input
                                                    required
                                                    type="color"
                                                    value={skillForm.color}
                                                    onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                                                    className="w-full h-10 bg-white/5 border border-white/5 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500/50"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all mt-4">
                                            Add Skill
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                {skills.map((skill) => (
                                    <div key={skill._id} className="bg-[#0a0f1d] border border-white/5 p-4 rounded-xl flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20">
                                                {skill.skill.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold">{skill.skill}</h4>
                                                <span className="text-[10px] uppercase text-gray-500 font-mono">{skill.cat} • {skill.level}%</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete('skills', skill._id)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'projects' && (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            <div>
                                <form onSubmit={handleAddProject} className="bg-[#0a0f1d] border border-white/10 p-8 rounded-2xl sticky top-32">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <Plus size={20} className="text-blue-500" />
                                        Add New Project
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Project Title</label>
                                            <input
                                                required
                                                type="text"
                                                value={projectForm.title}
                                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                                className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Description</label>
                                            <textarea
                                                required
                                                rows="3"
                                                value={projectForm.description}
                                                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                                className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50 resize-none"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Tech Stack (comma separated)</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="React, Node.js, MongoDB"
                                                value={projectForm.tech}
                                                onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                                                className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">GitHub URL</label>
                                                <input
                                                    type="url"
                                                    value={projectForm.github}
                                                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-gray-500 mb-2">Live URL</label>
                                                <input
                                                    type="url"
                                                    value={projectForm.live}
                                                    onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/5 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all mt-4">
                                            Add Project
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="space-y-4">
                                {projects.map((proj) => (
                                    <div key={proj._id} className="bg-[#0a0f1d] border border-white/5 p-6 rounded-2xl group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <Diamond size={14} className="text-blue-500 fill-blue-500" />
                                                <h4 className="text-lg font-bold uppercase">{proj.title}</h4>
                                            </div>
                                            <button
                                                onClick={() => handleDelete('projects', proj._id)}
                                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg group-hover:opacity-100 transition-all lg:opacity-0"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{proj.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {proj.tech.map((t, i) => (
                                                <span key={i} className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Admin;
