package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Enrollment;
import com.edutrack.edutrack_app.model.Course;
import com.edutrack.edutrack_app.repository.EnrollmentRepository;
import com.edutrack.edutrack_app.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/join")
    public ResponseEntity<?> joinCourse(@RequestBody Enrollment enrollment) {
        if (enrollmentRepository.existsByStudentIdAndCourseId(enrollment.getStudentId(), enrollment.getCourseId())) {
            return ResponseEntity.badRequest().body("Already enrolled in this course.");
        }
        
        enrollmentRepository.save(enrollment);

        Optional<Course> courseOpt = courseRepository.findById(enrollment.getCourseId());
        if (courseOpt.isPresent()) {
            Course course = courseOpt.get();
            int currentCount = course.getEnrolledStudents() == null ? 0 : course.getEnrolledStudents();
            course.setEnrolledStudents(currentCount + 1);
            courseRepository.save(course);
        }
        return ResponseEntity.ok("Successfully enrolled!");
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
    
    // NEW: Get all enrollments for a specific course
    @GetMapping("/course/{courseId}")
    public List<Enrollment> getCourseEnrollments(@PathVariable Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }
}