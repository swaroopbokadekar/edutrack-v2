package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Attendance;
import com.edutrack.edutrack_app.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @PostMapping("/mark")
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return attendanceRepository.save(attendance);
    }
}