package com.hameer.eduverse.model;

import com.hameer.eduverse.enums.SubmissionStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assignment_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"course"})
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"password", "bio"})
    private User student;

    @Column(length = 2000)
    private String content;

    @Column
    private Integer marks;

    @Column
    private String feedback;

    @Enumerated(EnumType.STRING)
    private SubmissionStatus status = SubmissionStatus.SUBMITTED;

    @Column
    private LocalDateTime submittedAt;
}