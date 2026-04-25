package com.edutrack.edutrack_app.repository;

import com.edutrack.edutrack_app.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // Make sure to import List

public interface CourseRepository extends JpaRepository<Course, Long> {
    // NEW: Find courses by teacher's name
    List<Course> findByTeacherName(String teacherName);
}