package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Grade;
import com.edutrack.edutrack_app.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired
    private GradeRepository gradeRepository;

    @GetMapping("/{userId}")
    public List<Grade> getUserGrades(@PathVariable Long userId) {
        return gradeRepository.findByUserId(userId);
    }

    @GetMapping("/analytics/class-average")
    public Map<String, Double> getClassAverages() {
        List<Grade> allGrades = gradeRepository.findAll();
        // Logic: LinkedHashMap preserves insertion order for the chart bars
        Map<String, Double> averages = new LinkedHashMap<>();
        
        if (allGrades.isEmpty()) {
            averages.put("Quiz 1", 0.0);
            averages.put("Midterm", 0.0);
            averages.put("Assignment", 0.0);
            averages.put("Final", 0.0);
            return averages;
        }

        double quizAvg = allGrades.stream().mapToInt(Grade::getQuiz).average().orElse(0.0);
        double midAvg = allGrades.stream().mapToInt(Grade::getMidterm).average().orElse(0.0);
        double assignAvg = allGrades.stream().mapToInt(Grade::getAssignment).average().orElse(0.0);
        double finalAvg = (quizAvg + midAvg + assignAvg) / 3;

        averages.put("Quiz 1", quizAvg);
        averages.put("Midterm", midAvg);
        averages.put("Assignment", assignAvg);
        averages.put("Final", finalAvg);

        return averages;
    }

    @PostMapping("/update")
    public String updateGrade(@RequestBody Map<String, Object> payload) {
        try {
            String role = (String) payload.get("role");
            if ("TEACHER".equalsIgnoreCase(role) || "ADMIN".equalsIgnoreCase(role)) {
                Grade grade = new Grade();
                grade.setUserId(Long.valueOf(payload.get("userId").toString()));
                
                Object classIdObj = payload.get("classId");
                grade.setClassId(classIdObj != null ? Long.valueOf(classIdObj.toString()) : 101L);
                
                grade.setQuiz(Integer.parseInt(payload.get("quiz").toString()));
                grade.setMidterm(Integer.parseInt(payload.get("midterm").toString()));
                grade.setAssignment(Integer.parseInt(payload.get("assignment").toString()));
                
                // Use saveAndFlush to force the write to MySQL
                gradeRepository.saveAndFlush(grade); 
                
                return "Grade updated successfully!";
            }
            return "Access Denied";
        } catch (Exception e) {
            e.printStackTrace();
            return "Server Error: " + e.getMessage();
        }
    }
}