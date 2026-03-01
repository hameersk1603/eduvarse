package com.hameer.eduverse.controller;

import com.hameer.eduverse.model.Announcement;
import com.hameer.eduverse.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @PostMapping("/create/{courseId}/{userId}")
    public ResponseEntity<?> create(@PathVariable Long courseId, @PathVariable Long userId,
                                    @RequestBody Announcement announcement) {
        try {
            return ResponseEntity.ok(announcementService.createAnnouncement(courseId, userId, announcement));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Announcement>> getByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(announcementService.getAnnouncementsByCourse(courseId));
    }
}