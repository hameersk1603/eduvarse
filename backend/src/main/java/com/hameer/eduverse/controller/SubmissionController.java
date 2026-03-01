package com.hameer.eduverse.controller;

import com.hameer.eduverse.model.Submission;
import com.hameer.eduverse.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestBody Map<String, Object> body) {
        try {
            Long assignmentId = Long.valueOf(body.get("assignmentId").toString());
            Long studentId = Long.valueOf(body.get("studentId").toString());
            String content = body.get("content").toString();
            return ResponseEntity.ok(submissionService.submitAssignment(assignmentId, studentId, content));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Submission>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByStudent(studentId));
    }

    @GetMapping("/assignment/{assignmentId}")
    public ResponseEntity<List<Submission>> getByAssignment(@PathVariable Long assignmentId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByAssignment(assignmentId));
    }

    @PutMapping("/grade/{id}")
    public ResponseEntity<?> grade(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        try {
            Integer marks = Integer.valueOf(body.get("marks").toString());
            String feedback = body.get("feedback").toString();
            return ResponseEntity.ok(submissionService.gradeSubmission(id, marks, feedback));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}