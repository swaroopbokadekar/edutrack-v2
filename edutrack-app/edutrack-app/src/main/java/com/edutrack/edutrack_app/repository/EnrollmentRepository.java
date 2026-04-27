package com.edutrack.edutrack_app.repository;

import com.edutrack.edutrack_app.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    
    // Used by the Student Dashboard
    List<Enrollment> findByStudentId(Long studentId);
    
    // NEW: Used by the Teacher Dashboard
    List<Enrollment> findByCourseId(Long courseId);
    
    // Used by the Enrollment Engine to prevent duplicates
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
}