package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Grade;
import com.edutrack.edutrack_app.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:3000") // 🚨 This prevents the "Failed to fetch" error!
public class GradeController {

    @Autowired
    private GradeRepository gradeRepository;

    // 🚨 This is the exact endpoint React is looking for when you click Save!
    @PostMapping("/update")
    public Grade updateGrade(@RequestBody Grade grade) {
        return gradeRepository.save(grade);
    }

    @GetMapping("/{userId}")
    public List<Grade> getStudentGrades(@PathVariable Long userId) {
        return gradeRepository.findByUserId(userId);
    }
}