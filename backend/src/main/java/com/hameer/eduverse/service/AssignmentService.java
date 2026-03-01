package com.hameer.eduverse.service;

import com.hameer.eduverse.model.Assignment;
import com.hameer.eduverse.model.Course;
import com.hameer.eduverse.repository.AssignmentRepository;
import com.hameer.eduverse.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Assignment createAssignment(Long courseId, Assignment assignment) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        assignment.setCourse(course);
        assignment.setCreatedAt(LocalDateTime.now());
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsByCourse(Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
    }

    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }
}