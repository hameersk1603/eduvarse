import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCoursesByTeacher, createCourse, deleteCourse, createAssignment, getAssignmentsByCourse, getSubmissionsByAssignment, gradeSubmission, getEnrollmentsByCourse } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const TeacherDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [showGradeModal, setShowGradeModal] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [gradeForm, setGradeForm] = useState({ marks: '', feedback: '' });
    const [successMsg, setSuccessMsg] = useState('');
    const [courseForm, setCourseForm] = useState({ title: '', description: '', category: '', thumbnail: '' });
    const [assignmentForm, setAssignmentForm] = useState({ title: '', description: '', dueDate: '', maxMarks: 100 });

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await getCoursesByTeacher(user.id);
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            await createCourse(user.id, courseForm);
            setShowCourseModal(false);
            setCourseForm({ title: '', description: '', category: '', thumbnail: '' });
            setSuccessMsg('Course created successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
            fetchCourses();
        } catch (err) { console.error(err); }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm('Delete this course?')) {
            await deleteCourse(id);
            fetchCourses();
        }
    };

    const handleViewCourse = async (course) => {
        setSelectedCourse(course);
        setActiveTab('assignments');
        try {
            const [assignRes, enrollRes] = await Promise.all([
                getAssignmentsByCourse(course.id),
                getEnrollmentsByCourse(course.id)
            ]);
            setAssignments(assignRes.data);
            setEnrollments(enrollRes.data);
        } catch (err) { console.error(err); }
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        try {
            await createAssignment(selectedCourse.id, assignmentForm);
            setShowAssignmentModal(false);
            setAssignmentForm({ title: '', description: '', dueDate: '', maxMarks: 100 });
            setSuccessMsg('Assignment created!');
            setTimeout(() => setSuccessMsg(''), 3000);
            const res = await getAssignmentsByCourse(selectedCourse.id);
            setAssignments(res.data);
        } catch (err) { console.error(err); }
    };

    const handleViewSubmissions = async (assignment) => {
        try {
            const res = await getSubmissionsByAssignment(assignment.id);
            setSubmissions(res.data);
            setActiveTab('submissions');
        } catch (err) { console.error(err); }
    };

    const handleGrade = async () => {
        try {
            await gradeSubmission(selectedSubmission.id, { marks: parseInt(gradeForm.marks), feedback: gradeForm.feedback });
            setShowGradeModal(false);
            setSuccessMsg('Graded successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
            const res = await getSubmissionsByAssignment(selectedSubmission.assignment.id);
            setSubmissions(res.data);
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => { logout(); navigate('/'); };

    const stats = [
        { icon: '📚', value: courses.length, label: 'My Courses' },
        { icon: '👥', value: enrollments.length, label: 'Total Students' },
        { icon: '📝', value: assignments.length, label: 'Assignments' },
        { icon: '✅', value: submissions.filter(s => s.status === 'GRADED').length, label: 'Graded' }
    ];

    return (
        <div style={{ background: '#0a0612', minHeight: '100vh' }}>
            <motion.nav className="navbar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🎓 EduVerse</div>
                <div className="navbar-links">
                    <button className={`navbar-link ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>My Courses</button>
                    {selectedCourse && <button className={`navbar-link ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>Assignments</button>}
                    {activeTab === 'submissions' && <button className="navbar-link active">Submissions</button>}
                    <motion.button className="btn-gold" style={{ padding: '10px 20px', fontSize: '13px' }}
                        onClick={() => setShowCourseModal(true)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        + New Course
                    </motion.button>
                    <button className="btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {successMsg && (
                    <motion.div className="success-toast"
                        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        ✅ {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="dashboard" style={{ paddingTop: '100px' }}>
                <motion.div className="dashboard-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="dashboard-title">
                        Teacher Dashboard — <span className="gradient-text">{user?.name} 👨‍🏫</span>
                    </h2>
                    <p className="dashboard-subtitle">Manage your courses and students</p>
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
                        {/* My Courses */}
                        {activeTab === 'courses' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h3 className="section-title">My <span className="gradient-text">Courses</span></h3>
                                    <motion.button className="btn-gold" onClick={() => setShowCourseModal(true)}
                                        whileHover={{ scale: 1.05 }}>+ Create Course</motion.button>
                                </div>
                                {courses.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-state-icon">📭</div>
                                        <p className="empty-state-text">No courses yet</p>
                                        <motion.button className="btn-gold" style={{ marginTop: '20px' }}
                                            onClick={() => setShowCourseModal(true)} whileHover={{ scale: 1.05 }}>
                                            Create First Course
                                        </motion.button>
                                    </div>
                                ) : (
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
                                                    <p className="course-desc">{course.description?.substring(0, 80)}...</p>
                                                    <div className="course-footer">
                                                        <motion.button style={{ padding: '6px 14px', background: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                                                            onClick={() => handleViewCourse(course)}
                                                            whileHover={{ scale: 1.05 }}>
                                                            📝 Manage
                                                        </motion.button>
                                                        <motion.button className="btn-danger"
                                                            onClick={() => handleDeleteCourse(course.id)}
                                                            whileHover={{ scale: 1.05 }}>
                                                            🗑 Delete
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Assignments */}
                        {activeTab === 'assignments' && selectedCourse && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h3 className="section-title">
                                        <span className="gradient-text">{selectedCourse.title}</span> — Assignments
                                    </h3>
                                    <motion.button className="btn-gold" onClick={() => setShowAssignmentModal(true)}
                                        whileHover={{ scale: 1.05 }}>+ Add Assignment</motion.button>
                                </div>
                                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(124,58,237,0.06)', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.15)' }}>
                                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                                        👥 <span style={{ color: '#f59e0b', fontWeight: '600' }}>{enrollments.length}</span> students enrolled
                                    </p>
                                </div>
                                <div className="data-table">
                                    <div className="table-header">📝 Assignments</div>
                                    {assignments.length === 0 ? (
                                        <div className="empty-state">
                                            <div className="empty-state-icon">📭</div>
                                            <p className="empty-state-text">No assignments yet</p>
                                            <motion.button className="btn-gold" style={{ marginTop: '20px' }}
                                                onClick={() => setShowAssignmentModal(true)} whileHover={{ scale: 1.05 }}>
                                                Create Assignment
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Due Date</th>
                                                    <th>Max Marks</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assignments.map((assignment, i) => (
                                                    <motion.tr key={assignment.id}
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        transition={{ delay: i * 0.05 }}>
                                                        <td style={{ fontWeight: '600', color: '#fff' }}>{assignment.title}</td>
                                                        <td>{assignment.dueDate || 'No deadline'}</td>
                                                        <td style={{ color: '#f59e0b' }}>{assignment.maxMarks}</td>
                                                        <td>
                                                            <motion.button style={{ padding: '6px 14px', background: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}
                                                                onClick={() => handleViewSubmissions(assignment)}
                                                                whileHover={{ scale: 1.05 }}>
                                                                👁 View Submissions
                                                            </motion.button>
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
                                    <h3 className="section-title">Student <span className="gradient-text">Submissions</span></h3>
                                    <button className="btn-secondary" onClick={() => setActiveTab('assignments')}>← Back</button>
                                </div>
                                <div className="data-table">
                                    <div className="table-header">📋 All Submissions</div>
                                    {submissions.length === 0 ? (
                                        <div className="empty-state">
                                            <div className="empty-state-icon">📭</div>
                                            <p className="empty-state-text">No submissions yet</p>
                                        </div>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Student</th>
                                                    <th>Content</th>
                                                    <th>Status</th>
                                                    <th>Marks</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {submissions.map((sub, i) => (
                                                    <motion.tr key={sub.id}
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        transition={{ delay: i * 0.05 }}>
                                                        <td style={{ fontWeight: '600', color: '#fff' }}>{sub.student?.name}</td>
                                                        <td style={{ color: '#6b7280', fontSize: '13px' }}>{sub.content?.substring(0, 60)}...</td>
                                                        <td>
                                                            <span className={`badge ${sub.status === 'GRADED' ? 'badge-green' : 'badge-purple'}`}>
                                                                {sub.status}
                                                            </span>
                                                        </td>
                                                        <td style={{ color: '#f59e0b', fontWeight: '700' }}>
                                                            {sub.marks !== null ? `${sub.marks}/100` : '—'}
                                                        </td>
                                                        <td>
                                                            <motion.button className="btn-gold"
                                                                style={{ padding: '6px 16px', fontSize: '12px' }}
                                                                onClick={() => { setSelectedSubmission(sub); setGradeForm({ marks: sub.marks || '', feedback: sub.feedback || '' }); setShowGradeModal(true); }}
                                                                whileHover={{ scale: 1.05 }}>
                                                                ✏️ Grade
                                                            </motion.button>
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

            {/* Create Course Modal */}
            <AnimatePresence>
                {showCourseModal && (
                    <motion.div className="modal-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowCourseModal(false)}>
                        <motion.div className="modal"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Create New Course</h3>
                                <button className="modal-close" onClick={() => setShowCourseModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleCreateCourse}>
                                <div className="form-group">
                                    <label>Course Title</label>
                                    <input className="form-input" placeholder="e.g. Full Stack Development"
                                        value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input className="form-input" placeholder="e.g. Technology, Design"
                                        value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-input" style={{ minHeight: '100px', resize: 'vertical' }}
                                        placeholder="Describe your course..."
                                        value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} />
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="button" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#6b7280', cursor: 'pointer' }}
                                        onClick={() => setShowCourseModal(false)}>Cancel</button>
                                    <motion.button className="btn-gold" style={{ flex: 2 }} type="submit"
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        🚀 Create Course
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Create Assignment Modal */}
            <AnimatePresence>
                {showAssignmentModal && (
                    <motion.div className="modal-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowAssignmentModal(false)}>
                        <motion.div className="modal"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Create Assignment</h3>
                                <button className="modal-close" onClick={() => setShowAssignmentModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleCreateAssignment}>
                                <div className="form-group">
                                    <label>Assignment Title</label>
                                    <input className="form-input" placeholder="e.g. Build a REST API"
                                        value={assignmentForm.title} onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-input" style={{ minHeight: '100px', resize: 'vertical' }}
                                        placeholder="Describe the assignment..."
                                        value={assignmentForm.description} onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input className="form-input" type="date"
                                            value={assignmentForm.dueDate} onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Max Marks</label>
                                        <input className="form-input" type="number" placeholder="100"
                                            value={assignmentForm.maxMarks} onChange={(e) => setAssignmentForm({ ...assignmentForm, maxMarks: e.target.value })} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="button" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#6b7280', cursor: 'pointer' }}
                                        onClick={() => setShowAssignmentModal(false)}>Cancel</button>
                                    <motion.button className="btn-gold" style={{ flex: 2 }} type="submit"
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        📝 Create Assignment
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grade Modal */}
            <AnimatePresence>
                {showGradeModal && selectedSubmission && (
                    <motion.div className="modal-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowGradeModal(false)}>
                        <motion.div className="modal"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Grade Submission</h3>
                                <button className="modal-close" onClick={() => setShowGradeModal(false)}>×</button>
                            </div>
                            <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(124,58,237,0.08)', borderRadius: '10px' }}>
                                <p style={{ color: '#a855f7', fontWeight: '600' }}>{selectedSubmission.student?.name}</p>
                                <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }}>{selectedSubmission.content}</p>
                            </div>
                            <div className="form-group">
                                <label>Marks (out of 100)</label>
                                <input className="form-input" type="number" min="0" max="100" placeholder="Enter marks"
                                    value={gradeForm.marks} onChange={(e) => setGradeForm({ ...gradeForm, marks: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Feedback</label>
                                <textarea className="form-input" style={{ minHeight: '100px', resize: 'vertical' }}
                                    placeholder="Give feedback to the student..."
                                    value={gradeForm.feedback} onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#6b7280', cursor: 'pointer' }}
                                    onClick={() => setShowGradeModal(false)}>Cancel</button>
                                <motion.button className="btn-gold" style={{ flex: 2 }}
                                    onClick={handleGrade}
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    ✅ Submit Grade
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TeacherDashboard;