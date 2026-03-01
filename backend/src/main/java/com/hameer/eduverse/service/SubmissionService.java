package com.hameer.eduverse.service;

import com.hameer.eduverse.enums.SubmissionStatus;
import com.hameer.eduverse.model.Assignment;
import com.hameer.eduverse.model.Submission;
import com.hameer.eduverse.model.User;
import com.hameer.eduverse.repository.AssignmentRepository;
import com.hameer.eduverse.repository.SubmissionRepository;
import com.hameer.eduverse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Submission submitAssignment(Long assignmentId, Long studentId, String content) {
        if (submissionRepository.findByAssignmentIdAndStudentId(assignmentId, studentId).isPresent()) {
            throw new RuntimeException("Already submitted");
        }
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Submission submission = new Submission();
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setContent(content);
        submission.setStatus(SubmissionStatus.SUBMITTED);
        submission.setSubmittedAt(LocalDateTime.now());
        return submissionRepository.save(submission);
    }

    public List<Submission> getSubmissionsByStudent(Long studentId) {
        return submissionRepository.findByStudentId(studentId);
    }

    public List<Submission> getSubmissionsByAssignment(Long assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId);
    }

    public Submission gradeSubmission(Long id, Integer marks, String feedback) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        submission.setMarks(marks);
        submission.setFeedback(feedback);
        submission.setStatus(SubmissionStatus.GRADED);
        return submissionRepository.save(submission);
    }
}