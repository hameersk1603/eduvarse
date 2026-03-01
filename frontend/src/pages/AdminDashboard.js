import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUsersByRole, getAllCourses } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [studentsRes, teachersRes, coursesRes] = await Promise.all([
                getUsersByRole('STUDENT'),
                getUsersByRole('TEACHER'),
                getAllCourses()
            ]);
            setStudents(studentsRes.data);
            setTeachers(teachersRes.data);
            setCourses(coursesRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => { logout(); navigate('/'); };

    const stats = [
        { icon: '🎒', value: students.length, label: 'Total Students' },
        { icon: '👨‍🏫', value: teachers.length, label: 'Total Teachers' },
        { icon: '📚', value: courses.length, label: 'Total Courses' },
        { icon: '👑', value: '1', label: 'Admins' }
    ];

    return (
        <div style={{ background: '#0a0612', minHeight: '100vh' }}>
            <motion.nav className="navbar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🎓 EduVerse</div>
                <div className="navbar-links">
                    {['overview', 'students', 'teachers', 'courses'].map(tab => (
                        <button key={tab} className={`navbar-link ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                    <button className="btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </motion.nav>

            <div className="dashboard" style={{ paddingTop: '100px' }}>
                <motion.div className="dashboard-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="dashboard-title">
                        Admin Dashboard 👑 <span className="gradient-text">Control Panel</span>
                    </h2>
                    <p className="dashboard-subtitle">Manage all users, courses and platform settings</p>
                </motion.div>

                <motion.div className="stats-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    {stats.map((stat, i) => (
                        <motion.div key={i} className="stat-card" whileHover={{ y: -4 }}>
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {loading ? <div className="loading"><div className="spinner"></div></div> : (
                    <>
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div className="data-table">
                                    <div className="table-header">🎒 Recent Students</div>
                                    <table>
                                        <thead>
                                            <tr><th>Name</th><th>Email</th></tr>
                                        </thead>
                                        <tbody>
                                            {students.slice(0, 5).map((s, i) => (
                                                <tr key={s.id}>
                                                    <td style={{ fontWeight: '600', color: '#fff' }}>{s.name}</td>
                                                    <td style={{ color: '#6b7280' }}>{s.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="data-table">
                                    <div className="table-header">👨‍🏫 Recent Teachers</div>
                                    <table>
                                        <thead>
                                            <tr><th>Name</th><th>Email</th></tr>
                                        </thead>
                                        <tbody>
                                            {teachers.slice(0, 5).map((t, i) => (
                                                <tr key={t.id}>
                                                    <td style={{ fontWeight: '600', color: '#fff' }}>{t.name}</td>
                                                    <td style={{ color: '#6b7280' }}>{t.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'students' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="data-table">
                                    <div className="table-header">🎒 All Students ({students.length})</div>
                                    <table>
                                        <thead>
                                            <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th></tr>
                                        </thead>
                                        <tbody>
                                            {students.map((s, i) => (
                                                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                                    <td style={{ color: '#6b7280' }}>{i + 1}</td>
                                                    <td style={{ fontWeight: '600', color: '#fff' }}>{s.name}</td>
                                                    <td style={{ color: '#a855f7' }}>{s.email}</td>
                                                    <td style={{ color: '#6b7280' }}>{s.phone || '—'}</td>
                                                    <td style={{ color: '#6b7280' }}>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'teachers' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="data-table">
                                    <div className="table-header">👨‍🏫 All Teachers ({teachers.length})</div>
                                    <table>
                                        <thead>
                                            <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th></tr>
                                        </thead>
                                        <tbody>
                                            {teachers.map((t, i) => (
                                                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                                    <td style={{ color: '#6b7280' }}>{i + 1}</td>
                                                    <td style={{ fontWeight: '600', color: '#fff' }}>{t.name}</td>
                                                    <td style={{ color: '#f59e0b' }}>{t.email}</td>
                                                    <td style={{ color: '#6b7280' }}>{t.phone || '—'}</td>
                                                    <td style={{ color: '#6b7280' }}>{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '—'}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'courses' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="data-table">
                                    <div className="table-header">📚 All Courses ({courses.length})</div>
                                    <table>
                                        <thead>
                                            <tr><th>#</th><th>Title</th><th>Teacher</th><th>Category</th><th>Status</th></tr>
                                        </thead>
                                        <tbody>
                                            {courses.map((c, i) => (
                                                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                                    <td style={{ color: '#6b7280' }}>{i + 1}</td>
                                                    <td style={{ fontWeight: '600', color: '#fff' }}>{c.title}</td>
                                                    <td style={{ color: '#a855f7' }}>{c.teacher?.name}</td>
                                                    <td><span className="badge badge-purple">{c.category || 'General'}</span></td>
                                                    <td><span className={`badge ${c.active ? 'badge-green' : 'badge-red'}`}>{c.active ? 'Active' : 'Inactive'}</span></td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;