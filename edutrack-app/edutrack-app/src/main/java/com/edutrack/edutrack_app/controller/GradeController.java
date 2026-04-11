package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Grade;
import com.edutrack.edutrack_app.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired
    private GradeRepository gradeRepository;

    // View grades for a specific student
    @GetMapping("/{userId}")
    public List<Grade> getUserGrades(@PathVariable Long userId) {
        return gradeRepository.findByUserId(userId);
    }

    // Update grades with Teacher/Admin check
    @PostMapping("/update")
    public String updateGrade(@RequestBody Map<String, Object> payload) {
        String role = (String) payload.get("role");
        
        if ("TEACHER".equalsIgnoreCase(role) || "ADMIN".equalsIgnoreCase(role)) {
            Grade grade = new Grade();
            grade.setUserId(Long.valueOf(payload.get("userId").toString()));
            grade.setClassId(Long.valueOf(payload.get("classId").toString()));
            grade.setQuiz(Integer.parseInt(payload.get("quiz").toString()));
            grade.setMidterm(Integer.parseInt(payload.get("midterm").toString()));
            grade.setAssignment(Integer.parseInt(payload.get("assignment").toString()));
            
            gradeRepository.save(grade);
            return "Grade updated successfully!";
        } else {
            return "Access Denied: You do not have permission to edit grades.";
        }
    }
}