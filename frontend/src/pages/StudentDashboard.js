import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllCourses, getEnrollmentsByStudent, enrollStudent, getAssignmentsByCourse, getSubmissionsByStudent, submitAssignment } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submitContent, setSubmitContent] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [coursesRes, enrollRes, subsRes] = await Promise.all([
                getAllCourses(),
                getEnrollmentsByStudent(user.id),
                getSubmissionsByStudent(user.id)
            ]);
            setCourses(coursesRes.data);
            setEnrollments(enrollRes.data);
            setSubmissions(subsRes.data);

            // Fetch assignments for enrolled courses
            const allAssignments = [];
            for (const enrollment of enrollRes.data) {
                const assignRes = await getAssignmentsByCourse(enrollment.course.id);
                allAssignments.push(...assignRes.data);
            }
            setAssignments(allAssignments);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            await enrollStudent({ studentId: user.id, courseId });
            setSuccessMsg('Successfully enrolled!');
            setTimeout(() => setSuccessMsg(''), 3000);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.error || 'Already enrolled');
        }
    };

    const handleSubmit = async () => {
        try {
            await submitAssignment({ assignmentId: selectedAssignment.id, studentId: user.id, content: submitContent });
            setShowSubmitModal(false);
            setSuccessMsg('Assignment submitted successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.error || 'Already submitted');
        }
    };

    const handleLogout = () => { logout(); navigate('/'); };
    const isEnrolled = (courseId) => enrollments.some(e => e.course.id === courseId);
    const isSubmitted = (assignmentId) => submissions.some(s => s.assignment.id === assignmentId);

    const stats = [
        { icon: '📚', value: enrollments.length, label: 'Enrolled Courses' },
        { icon: '📝', value: assignments.length, label: 'Assignments' },
        { icon: '✅', value: submissions.length, label: 'Submitted' },
        { icon: '⏳', value: assignments.length - submissions.length, label: 'Pending' }
    ];

    const tabs = ['courses', 'my-courses', 'assignments', 'submissions'];

    return (
        <div style={{ background: '#0a0612', minHeight: '100vh' }}>
            {/* Navbar */}
            <motion.nav className="navbar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🎓 EduVerse</div>
                <div className="navbar-links">
                    {tabs.map(tab => (
                        <button key={tab} className={`navbar-link ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}>
                            {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                    ))}
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '800', color: '#fff', cursor: 'pointer', fontSize: '14px'
                    }}>{user?.name?.charAt(0).toUpperCase()}</div>
                    <button className="btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </motion.nav>

            {/* Success Toast */}
            <AnimatePresence>
                {successMsg && (
                    <motion.div className="success-toast"
                        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        ✅ {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="dashboard" style={{ paddingTop: '100px' }}>
                {/* Header */}
                <motion.div className="dashboard-header"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="dashboard-title">
                        Welcome, <span className="gradient-text">{user?.name} 🎒</span>
                    </h2>
                    <p className="dashboard-subtitle">Continue your royal learning journey</p>
                </motion.div>

                {/* Stats */}
                <motion.div className="stats-grid"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    {stats.map((stat, i) => (
                        <motion.div key={i} className="stat-card" whileHover={{ y: -4 }}>
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tab Content */}
                {loading ? (
                    <div className="loading"><div className="spinner"></div></div>
                ) : (
                    <>
                        {/* All Courses */}
                        {activeTab === 'courses' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h3 className="section-title">Browse <span className="gradient-text">Courses</span></h3>
                                </div>
                                <div className="courses-grid">
                                    {courses.map((course, i) => (
                                        <motion.div key={course.id} className="course-card"
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}>
                                            <div className="course-thumbnail" style={{ fontSize: '52px' }}>
                                                {['💻', '🎨', '📊', '🚀', '🔐', '📱'][i % 6]}
                                            </div>
                                            <div className="course-body">
                                                <span className="badge badge-purple" style={{ marginBottom: '8px', display: 'inline-block' }}>
                                                    {course.category || 'General'}
                                                </span>
                                                <h3 className="course-title">{course.title}</h3>
                                                <p className="course-teacher">👨‍🏫 {course.teacher?.name}</p>
                                                <p className="course-desc">{course.description?.substring(0, 80)}...</p>
                                                <div className="course-footer">
                                                    {isEnrolled(course.id) ? (
                                                        <span className="badge badge-green">✅ Enrolled</span>
                                                    ) : (
                                                        <motion.button className="btn-gold"
                                                            style={{ padding: '8px 20px', fontSize: '13px' }}
                                                            onClick={() => handleEnroll(course.id)}
                                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            Enroll Now
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {courses.length === 0 && (
                                    <div className="empty-state">
                                        <div className="empty-state-icon">📭</div>
                                        <p className="empty-state-text">No courses available yet</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* My Courses */}
                        {activeTab === 'my-courses' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h3 className="section-title">My <span className="gradient-text">Enrollments</span></h3>
                                </div>
                                <div className="courses-grid">
                                    {enrollments.map((enrollment, i) => (
                                        <motion.div key={enrollment.id} className="course-card"
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}>
                                            <div className="course-thumbnail" style={{ fontSize: '52px' }}>
                                                {['💻', '🎨', '📊', '🚀', '🔐', '📱'][i % 6]}
                                            </div>
                                            <div className="course-body">
                                                <h3 className="course-title">{enrollment.course?.title}</h3>
                                                <p className="course-teacher">👨‍🏫 {enrollment.course?.teacher?.name}</p>
                                                <div style={{ marginTop: '12px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                        <span style={{ color: '#6b7280', fontSize: '13px' }}>Progress</span>
                                                        <span style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600' }}>{enrollment.progress}%</span>
                                                    </div>
                                                    <div style={{ background: 'rgba(124,58,237,0.2)', borderRadius: '4px', height: '6px' }}>
                                                        <div style={{
                                                            background: 'linear-gradient(135deg, #7c3aed, #f59e0b)',
                                                            width: `${enrollment.progress}%`, height: '100%', borderRadius: '4px'
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="course-footer" style={{ marginTop: '16px' }}>
                                                    <span style={{ color: '#6b7280', fontSize: '13px' }}>
                                                        📅 {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                                    </span>
                                                    <span className="badge badge-green">Enrolled</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {enrollments.length === 0 && (
                                    <div className="empty-state">
                                        <div className="empty-state-icon">📭</div>
                                        <p className="empty-state-text">No enrollments yet</p>
                                        <p className="empty-state-sub">Browse courses and enroll to get started</p>
                                        <motion.button className="btn-gold" style={{ marginTop: '20px' }}
                                            onClick={() => setActiveTab('courses')}
                                            whileHover={{ scale: 1.05 }}>
                                            Browse Courses
                                        </motion.button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Assignments */}
                        {activeTab === 'assignments' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h3 className="section-title">My <span className="gradient-text">Assignments</span></h3>
                                </div>
                                <div className="data-table">
                                    <div className="table-header">📝 All Assignments</div>
                                    {assignments.length === 0 ? (
                                        <div className="empty-state">
                                            <div className="empty-state-icon">📭</div>
                                            <p className="empty-state-text">No assignments yet</p>
                                        </div>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Course</th>
                                                    <th>Due Date</th>
                                                    <th>Max Marks</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignments.map((assignment, i) => (
                                                    <motion.tr key={assignment.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05 }}>
                                                        <td style={{ fontWeight: '600', color: '#fff' }}>{assignment.title}</td>
                                                        <td style={{ color: '#a855f7' }}>{assignment.course?.title}</td>
                                                        <td>{assignment.dueDate || 'No deadline'}</td>
                                                        <td>{assignment.maxMarks}</td>
                                                        <td>
                                                            <span className={`badge ${isSubmitted(assignment.id) ? 'badge-green' : 'badge-gold'}`}>
                                                                {isSubmitted(assignment.id) ? '✅ Submitted' : '⏳ Pending'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {!isSubmitted(assignment.id) && (
                                                                <motion.button
                                                                    className="btn-primary"
                                                                    style={{ padding: '6px 16px', fontSize: '12px' }}
                                                                    onClick={() => { setSelectedAssignment(assignment); setShowSubmitModal(true); }}
                                                                    whileHover={{ scale: 1.05 }}>
                                                                    Submit
                                                                </motion.button>
                                                            )}
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Submissions */}
                        {activeTab === 'submissions' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h3 className="section-title">My <span className="gradient-text">Submissions</span></h3>
                                </div>
                                <div className="data-table">
                                    <div className="table-header">📋 Submission History</div>
                                    {submissions.length === 0 ? (
                                        <div className="empty-state">
                                            <div className="empty-state-icon">📭</div>
                                            <p className="empty-state-text">No submissions yet</p>
                                        </div>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Assignment</th>
                                                    <th>Status</th>
                                                    <th>Marks</th>
                                                    <th>Feedback</th>
                                                    <th>Submitted</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {submissions.map((sub, i) => (
                                                    <motion.tr key={sub.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05 }}>
                                                        <td style={{ fontWeight: '600', color: '#fff' }}>{sub.assignment?.title}</td>
                                                        <td>
                                                            <span className={`badge ${sub.status === 'GRADED' ? 'badge-green' : 'badge-purple'}`}>
                                                                {sub.status}
                                                            </span>
                                                        </td>
                                                        <td style={{ color: '#f59e0b', fontWeight: '700' }}>
                                                            {sub.marks !== null ? `${sub.marks}/100` : '—'}
                                                        </td>
                                                        <td style={{ color: '#6b7280', fontSize: '13px' }}>{sub.feedback || '—'}</td>
                                                        <td style={{ color: '#6b7280' }}>
                                                            {new Date(sub.submittedAt).toLocaleDateString()}
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* Submit Modal */}
            <AnimatePresence>
                {showSubmitModal && selectedAssignment && (
                    <motion.div className="modal-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowSubmitModal(false)}>
                        <motion.div className="modal"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Submit Assignment</h3>
                                <button className="modal-close" onClick={() => setShowSubmitModal(false)}>×</button>
                            </div>
                            <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(124,58,237,0.08)', borderRadius: '10px' }}>
                                <p style={{ color: '#a855f7', fontWeight: '600' }}>{selectedAssignment.title}</p>
                                <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>{selectedAssignment.description}</p>
                            </div>
                            <div className="form-group">
                                <label>Your Answer</label>
                                <textarea className="form-input" style={{ minHeight: '150px', resize: 'vertical' }}
                                    placeholder="Write your answer here..."
                                    value={submitContent} onChange={(e) => setSubmitContent(e.target.value)} />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#6b7280', cursor: 'pointer' }}
                                    onClick={() => setShowSubmitModal(false)}>Cancel</button>
                                <motion.button className="btn-gold" style={{ flex: 2 }}
                                    onClick={handleSubmit}
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    🚀 Submit Assignment
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentDashboard;