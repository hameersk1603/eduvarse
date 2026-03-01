import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/global.css';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        { icon: '👑', title: 'Royal Learning', desc: 'Experience premium education with world-class courses and expert teachers' },
        { icon: '🤖', title: 'AI Powered', desc: 'Get instant AI assistance, quiz generation, and personalized learning paths' },
        { icon: '📊', title: 'Track Progress', desc: 'Monitor your learning journey with detailed analytics and progress reports' },
        { icon: '🏆', title: 'Earn Certificates', desc: 'Complete courses and earn verified certificates to boost your career' },
        { icon: '👨‍🏫', title: 'Expert Teachers', desc: 'Learn from industry professionals with years of real world experience' },
        { icon: '📱', title: 'Learn Anywhere', desc: 'Access your courses from any device at any time that suits you' }
    ];

    const stats = [
        { value: '500+', label: 'Courses' },
        { value: '50+', label: 'Expert Teachers' },
        { value: '10,000+', label: 'Students' },
        { value: '95%', label: 'Success Rate' }
    ];

    const courses = [
        { emoji: '💻', title: 'Full Stack Development', teacher: 'Dr. Rajesh Kumar', students: 1240, category: 'Technology' },
        { emoji: '🎨', title: 'UI/UX Design Mastery', teacher: 'Prof. Priya Sharma', students: 980, category: 'Design' },
        { emoji: '📊', title: 'Data Science & AI', teacher: 'Dr. Arun Verma', students: 1560, category: 'Data Science' },
        { emoji: '🚀', title: 'Digital Marketing', teacher: 'Prof. Sneha Reddy', students: 870, category: 'Marketing' },
        { emoji: '🔐', title: 'Cyber Security', teacher: 'Dr. Vikram Singh', students: 720, category: 'Security' },
        { emoji: '📱', title: 'Mobile App Development', teacher: 'Prof. Kavya Nair', students: 1100, category: 'Technology' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div style={{ background: '#0a0612', minHeight: '100vh' }}>

            {/* Navbar */}
            <motion.nav className="navbar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand">🎓 EduVerse</div>
                <div className="navbar-links">
                    <button className="navbar-link" onClick={() => navigate('/courses')}>Courses</button>
                    <button className="navbar-link" onClick={() => navigate('/login')}>Login</button>
                    <motion.button className="btn-gold" style={{ padding: '10px 24px', fontSize: '14px' }}
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Get Started
                    </motion.button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '40px 60px'
            }}>
                {/* Background blobs */}
                <div style={{
                    position: 'absolute', top: '10%', left: '5%',
                    width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', right: '5%',
                    width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none'
                }} />

                <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', zIndex: 1 }}>
                    {/* Left Content */}
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        <motion.div variants={itemVariants} style={{
                            display: 'inline-block', padding: '8px 20px',
                            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                            borderRadius: '30px', color: '#f59e0b', fontSize: '13px',
                            fontWeight: '600', marginBottom: '24px', letterSpacing: '1px'
                        }}>
                            ✨ INDIA'S PREMIER LEARNING PLATFORM
                        </motion.div>

                        <motion.h1 variants={itemVariants} style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '62px', fontWeight: '800',
                            lineHeight: '1.1', marginBottom: '20px'
                        }}>
                            Unlock Your
                            <br />
                            <span className="gradient-text">Royal Potential</span>
                            <br />
                            with EduVerse
                        </motion.h1>

                        <motion.p variants={itemVariants} style={{
                            color: '#9ca3af', fontSize: '18px',
                            lineHeight: '1.7', marginBottom: '36px'
                        }}>
                            Experience world-class education with AI-powered learning,
                            expert teachers, and a community of 10,000+ students.
                        </motion.p>

                        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '16px' }}>
                            <motion.button className="btn-gold"
                                style={{ fontSize: '16px', padding: '16px 36px' }}
                                onClick={() => navigate('/register')}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                🚀 Start Learning Free
                            </motion.button>
                            <motion.button className="btn-secondary"
                                style={{ fontSize: '16px', padding: '16px 36px' }}
                                onClick={() => navigate('/courses')}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Explore Courses →
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={itemVariants} style={{
                            display: 'flex', gap: '32px', marginTop: '48px',
                            paddingTop: '32px', borderTop: '1px solid rgba(124,58,237,0.15)'
                        }}>
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '26px', fontWeight: '800',
                                        background: 'linear-gradient(135deg, #a855f7, #f59e0b)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                                    }}>{stat.value}</div>
                                    <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right - Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', label: 'Collaborative Learning' },
                                { img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&h=300&fit=crop', label: 'Expert Teachers' },
                                { img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop', label: 'Modern Classrooms' },
                                { img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop', label: 'Online Learning' }
                            ].map((item, i) => (
                                <motion.div key={i}
                                    style={{
                                        borderRadius: '16px', overflow: 'hidden',
                                        border: '1px solid rgba(124,58,237,0.2)',
                                        position: 'relative'
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <img src={item.img} alt={item.label}
                                        style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        padding: '8px 12px',
                                        background: 'linear-gradient(transparent, rgba(10,6,18,0.9))',
                                        fontSize: '12px', fontWeight: '600', color: '#f59e0b'
                                    }}>
                                        {item.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{
                                position: 'absolute', top: '-20px', right: '-20px',
                                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                                padding: '16px 20px', borderRadius: '16px',
                                textAlign: 'center', boxShadow: '0 10px 30px rgba(124,58,237,0.4)'
                            }}>
                            <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Playfair Display' }}>4.9★</div>
                            <div style={{ fontSize: '11px', color: '#c4b5fd', marginTop: '2px' }}>Student Rating</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            style={{
                                position: 'absolute', bottom: '-20px', left: '-20px',
                                background: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
                                padding: '16px 20px', borderRadius: '16px',
                                textAlign: 'center', boxShadow: '0 10px 30px rgba(245,158,11,0.4)'
                            }}>
                            <div style={{ fontSize: '22px', fontWeight: '800', color: '#0a0612', fontFamily: 'Playfair Display' }}>500+</div>
                            <div style={{ fontSize: '11px', color: '#78350f', marginTop: '2px' }}>Live Courses</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '80px 60px', background: 'rgba(124,58,237,0.03)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '40px', fontWeight: '800', marginBottom: '12px'
                    }}>
                        Why Choose <span className="gradient-text">EduVerse?</span>
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px' }}>
                        Everything you need to excel in your learning journey
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                    {features.map((feature, i) => (
                        <motion.div key={i}
                            className="glass-card"
                            style={{ padding: '32px' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, borderColor: 'rgba(245,158,11,0.4)' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{feature.icon}</div>
                            <h3 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '20px', fontWeight: '700', marginBottom: '10px'
                            }}>{feature.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Popular Courses Section */}
            <div style={{ padding: '80px 60px', maxWidth: '1300px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '40px', fontWeight: '800', marginBottom: '12px'
                    }}>
                        Popular <span className="gradient-text-gold">Courses</span>
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px' }}>
                        Explore our most loved courses by students worldwide
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    {courses.map((course, i) => (
                        <motion.div key={i}
                            className="course-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}>
                            <div className="course-thumbnail" style={{ fontSize: '64px', background: 'linear-gradient(135deg, #1e0a3c, #2d1b69)' }}>
                                {course.emoji}
                            </div>
                            <div className="course-body">
                                <span className="badge badge-purple" style={{ marginBottom: '10px', display: 'inline-block' }}>
                                    {course.category}
                                </span>
                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-teacher">👨‍🏫 {course.teacher}</p>
                                <div className="course-footer">
                                    <span style={{ color: '#6b7280', fontSize: '13px' }}>👥 {course.students} students</span>
                                    <motion.button className="btn-gold"
                                        style={{ padding: '8px 20px', fontSize: '13px' }}
                                        onClick={() => navigate('/login')}
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        Enroll Now
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div style={{ padding: '80px 60px', background: 'rgba(124,58,237,0.03)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '40px', fontWeight: '800', marginBottom: '12px'
                    }}>
                        What Our <span className="gradient-text">Students Say</span>
                    </h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                    {[
                        { name: 'Arjun Sharma', role: 'Software Engineer', text: 'EduVerse transformed my career. The courses are world-class and the AI assistant is incredibly helpful!', avatar: '👨‍💻' },
                        { name: 'Priya Patel', role: 'Data Scientist', text: 'The best learning platform I have ever used. The teachers are experts and the content is always up to date.', avatar: '👩‍🔬' },
                        { name: 'Rahul Verma', role: 'UI/UX Designer', text: 'I got my dream job after completing the design course here. Highly recommend EduVerse to everyone!', avatar: '🧑‍🎨' }
                    ].map((t, i) => (
                        <motion.div key={i}
                            className="glass-card"
                            style={{ padding: '28px' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.3)' }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>⭐⭐⭐⭐⭐</div>
                            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', fontStyle: 'italic' }}>
                                "{t.text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '20px'
                                }}>{t.avatar}</div>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{t.name}</div>
                                    <div style={{ color: '#f59e0b', fontSize: '12px' }}>{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    margin: '40px 60px',
                    padding: '80px',
                    borderRadius: '28px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(245,158,11,0.1))',
                    border: '1px solid rgba(124,58,237,0.25)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                <div style={{
                    position: 'absolute', top: '-50px', right: '-50px',
                    width: '300px', height: '300px',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
                    borderRadius: '50%'
                }} />
                <h2 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '44px', fontWeight: '800', marginBottom: '16px'
                }}>
                    Ready to Start Your <span className="gradient-text">Royal Journey?</span>
                </h2>
                <p style={{ color: '#9ca3af', marginBottom: '36px', fontSize: '18px' }}>
                    Join 10,000+ students who are already learning with EduVerse
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <motion.button className="btn-gold"
                        style={{ fontSize: '16px', padding: '16px 40px' }}
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        🎓 Join as Student
                    </motion.button>
                    <motion.button className="btn-secondary"
                        style={{ fontSize: '16px', padding: '16px 40px' }}
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        👨‍🏫 Become a Teacher
                    </motion.button>
                </div>
            </motion.div>

            {/* Footer */}
            <div style={{
                textAlign: 'center', padding: '30px',
                color: '#4b5563', fontSize: '14px',
                borderTop: '1px solid rgba(124,58,237,0.1)'
            }}>
                © 2026 EduVerse — Built with ❤️ by Hameer Shaik
            </div>
        </div>
    );
};

export default Home;