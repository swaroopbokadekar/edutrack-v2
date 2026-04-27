package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Assignment;
import com.edutrack.edutrack_app.model.Enrollment;
import com.edutrack.edutrack_app.repository.AssignmentRepository;
import com.edutrack.edutrack_app.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    // Teacher posts a new assignment
    @PostMapping("/add")
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    // Teacher views assignments for a specific class
    @GetMapping("/course/{courseId}")
    public List<Assignment> getCourseAssignments(@PathVariable Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }

    // Student views all their upcoming deadlines across all enrolled courses!
    @GetMapping("/student/{studentId}")
    public List<Assignment> getStudentAssignments(@PathVariable Long studentId) {
        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);
        List<Assignment> allAssignments = new ArrayList<>();
        
        for (Enrollment e : enrollments) {
            allAssignments.addAll(assignmentRepository.findByCourseId(e.getCourseId()));
        }
        return allAssignments;
    }
}