package com.hameer.eduverse.repository;

import com.hameer.eduverse.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByActiveTrue();
    List<Course> findByTeacherId(Long teacherId);
    List<Course> findByTitleContainingIgnoreCase(String title);
}