package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Grade;
import com.edutrack.edutrack_app.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired
    private GradeRepository gradeRepository;

    // Students and Teachers can both use this to view
    @GetMapping("/{userId}")
    public List<Grade> getUserGrades(@PathVariable Long userId) {
        return gradeRepository.findByUserId(userId);
    }

    // We will simulate a "Teacher Check" here
    @PostMapping("/update")
    public String updateGrade(@RequestBody Grade grade, @RequestParam String role) {
        if ("TEACHER".equalsIgnoreCase(role) || "ADMIN".equalsIgnoreCase(role)) {
            gradeRepository.save(grade);
            return "Grade updated successfully!";
        } else {
            return "Error: Only Teachers can edit grades!";
        }
    }
}