package com.hameer.eduverse.controller;

import com.hameer.eduverse.model.Enrollment;
import com.hameer.eduverse.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Map<String, Long> body) {
        try {
            return ResponseEntity.ok(enrollmentService.enrollStudent(body.get("studentId"), body.get("courseId")));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudent(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByCourse(courseId));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkEnrollment(@RequestParam Long studentId, @RequestParam Long courseId) {
        return ResponseEntity.ok(Map.of("enrolled", enrollmentService.isEnrolled(studentId, courseId)));
    }
}