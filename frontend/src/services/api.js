import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 'Content-Type': 'application/json' }
});

// User APIs
export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const updateUser = (id, data) => api.put(`/users/update/${id}`, data);
export const getUsersByRole = (role) => api.get(`/users/role/${role}`);

// Course APIs
export const createCourse = (teacherId, data) => api.post(`/courses/create/${teacherId}`, data);
export const getAllCourses = () => api.get('/courses/all');
export const getCoursesByTeacher = (teacherId) => api.get(`/courses/teacher/${teacherId}`);
export const searchCourses = (keyword) => api.get(`/courses/search?keyword=${keyword}`);
export const deleteCourse = (id) => api.delete(`/courses/delete/${id}`);
export const getCourseById = (id) => api.get(`/courses/${id}`);

// Enrollment APIs
export const enrollStudent = (data) => api.post('/enrollments/enroll', data);
export const getEnrollmentsByStudent = (studentId) => api.get(`/enrollments/student/${studentId}`);
export const getEnrollmentsByCourse = (courseId) => api.get(`/enrollments/course/${courseId}`);
export const checkEnrollment = (studentId, courseId) => api.get(`/enrollments/check?studentId=${studentId}&courseId=${courseId}`);

// Assignment APIs
export const createAssignment = (courseId, data) => api.post(`/assignments/create/${courseId}`, data);
export const getAssignmentsByCourse = (courseId) => api.get(`/assignments/course/${courseId}`);
export const deleteAssignment = (id) => api.delete(`/assignments/delete/${id}`);

// Submission APIs
export const submitAssignment = (data) => api.post('/submissions/submit', data);
export const getSubmissionsByStudent = (studentId) => api.get(`/submissions/student/${studentId}`);
export const getSubmissionsByAssignment = (assignmentId) => api.get(`/submissions/assignment/${assignmentId}`);
export const gradeSubmission = (id, data) => api.put(`/submissions/grade/${id}`, data);

// Announcement APIs
export const createAnnouncement = (courseId, userId, data) => api.post(`/announcements/create/${courseId}/${userId}`, data);
export const getAnnouncementsByCourse = (courseId) => api.get(`/announcements/course/${courseId}`);

export default api;