package com.edutrack.edutrack_app.repository;

import com.edutrack.edutrack_app.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    // This helper finds attendance for a specific student
    List<Attendance> findByUserId(Long userId);
}