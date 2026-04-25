package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Course;
import com.edutrack.edutrack_app.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping("/add")
    public Course addCourse(@RequestBody Course course) {
        if (course.getEnrolledStudents() == null) {
            course.setEnrolledStudents(0); // Default to 0 students when created
        }
        return courseRepository.saveAndFlush(course);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
        return "Course Deleted";
    }

    // NEW API: Get all courses assigned to a specific teacher
    @GetMapping("/teacher/{teacherName}")
    public List<Course> getCoursesByTeacher(@PathVariable String teacherName) {
        return courseRepository.findByTeacherName(teacherName);
    }
}