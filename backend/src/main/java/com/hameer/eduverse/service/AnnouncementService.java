package com.hameer.eduverse.service;

import com.hameer.eduverse.model.Announcement;
import com.hameer.eduverse.model.Course;
import com.hameer.eduverse.model.User;
import com.hameer.eduverse.repository.AnnouncementRepository;
import com.hameer.eduverse.repository.CourseRepository;
import com.hameer.eduverse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public Announcement createAnnouncement(Long courseId, Long userId, Announcement announcement) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        announcement.setCourse(course);
        announcement.setCreatedBy(user);
        announcement.setCreatedAt(LocalDateTime.now());
        return announcementRepository.save(announcement);
    }

    public List<Announcement> getAnnouncementsByCourse(Long courseId) {
        return announcementRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
    }
}