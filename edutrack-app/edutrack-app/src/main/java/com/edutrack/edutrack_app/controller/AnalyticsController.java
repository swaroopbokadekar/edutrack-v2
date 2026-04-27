package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Course;
import com.edutrack.edutrack_app.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grades/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/class-average")
    public Map<String, Integer> getClassAverages() {
        Map<String, Integer> averages = new HashMap<>();
        List<Course> courses = courseRepository.findAll();

        for (Course course : courses) {
            // Use native SQL to calculate the average of quiz, midterm, and assignment for this specific course
            String sql = "SELECT AVG((IFNULL(quiz, 0) + IFNULL(midterm, 0) + IFNULL(assignment, 0)) / 3) FROM grades WHERE class_id = ?";
            
            Integer avg = jdbcTemplate.queryForObject(sql, Integer.class, course.getId());
            
            if (avg != null) {
                averages.put(course.getCourseName(), avg);
            } else {
                averages.put(course.getCourseName(), 0); // Default to 0 if no grades exist yet
            }
        }
        return averages;
    }
}