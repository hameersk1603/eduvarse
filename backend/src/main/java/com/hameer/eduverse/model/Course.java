package com.hameer.eduverse.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column
    private String category;

    @Column
    private String thumbnail;

    @Column
    private boolean active = true;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"password", "bio"})
    private User teacher;

    @Column
    private LocalDateTime createdAt;
}