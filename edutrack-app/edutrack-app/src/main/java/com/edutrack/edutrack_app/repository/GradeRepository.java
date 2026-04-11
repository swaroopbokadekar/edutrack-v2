package com.edutrack.edutrack_app.repository;

import com.edutrack.edutrack_app.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    
    // Logic: This allows the system to fetch all grades belonging 
    // to a specific Student ID (userId) from edutrack_db.grades
    List<Grade> findByUserId(Long userId);
}