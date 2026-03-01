import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser } from '../services/api';
import '../styles/global.css';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT', bio: '', phone: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await registerUser(form);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email may already exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <motion.div className="auth-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}>
                <h1 className="auth-brand">🎓 EduVerse</h1>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join the royal learning experience</p>

                {error && <div className="auth-error">{error}</div>}

                <div className="role-selector">
                    {[
                        { value: 'STUDENT', icon: '🎒', label: 'Student' },
                        { value: 'TEACHER', icon: '👨‍🏫', label: 'Teacher' },
                        { value: 'ADMIN', icon: '👑', label: 'Admin' }
                    ].map(r => (
                        <button key={r.value} type="button"
                            className={`role-option ${form.role === r.value ? 'selected' : ''}`}
                            onClick={() => setForm({ ...form, role: r.value })}>
                            <span className="role-icon">{r.icon}</span>
                            {r.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input className="form-input" type="text" placeholder="Your full name"
                            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-input" type="email" placeholder="you@example.com"
                            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-input" type="password" placeholder="••••••••"
                            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input className="form-input" type="text" placeholder="Your phone number"
                            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <motion.button className="btn-gold" style={{ width: '100%', marginTop: '8px' }}
                        type="submit" disabled={loading}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        {loading ? 'Creating Account...' : 'Join EduVerse →'}
                    </motion.button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;