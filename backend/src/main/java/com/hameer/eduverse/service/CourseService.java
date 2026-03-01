package com.hameer.eduverse.service;

import com.hameer.eduverse.model.Course;
import com.hameer.eduverse.model.User;
import com.hameer.eduverse.repository.CourseRepository;
import com.hameer.eduverse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Course createCourse(Long teacherId, Course course) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        course.setTeacher(teacher);
        course.setCreatedAt(LocalDateTime.now());
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findByActiveTrue();
    }

    public List<Course> getCoursesByTeacher(Long teacherId) {
        return courseRepository.findByTeacherId(teacherId);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public List<Course> searchCourses(String keyword) {
        return courseRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public Course updateCourse(Long id, Course updated) {
        Course course = getCourseById(id);
        course.setTitle(updated.getTitle());
        course.setDescription(updated.getDescription());
        course.setCategory(updated.getCategory());
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}