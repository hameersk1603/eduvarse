import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await loginUser({ email, password });
            login(response.data);
            const role = response.data.role;
            if (role === 'ADMIN') navigate('/admin-dashboard');
            else if (role === 'TEACHER') navigate('/teacher-dashboard');
            else navigate('/student-dashboard');
        } catch (err) {
            setError('Invalid email or password');
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
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to continue your learning journey</p>

                {error && (
                    <motion.div className="auth-error"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input className="form-input" type="email" placeholder="you@example.com"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-input" type="password" placeholder="••••••••"
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <motion.button className="btn-gold" style={{ width: '100%', marginTop: '8px' }}
                        type="submit" disabled={loading}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        {loading ? 'Logging in...' : 'Login to EduVerse →'}
                    </motion.button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;