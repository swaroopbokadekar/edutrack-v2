package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.Attendance;
import com.edutrack.edutrack_app.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate; // Ensure this is here
import java.util.List;
import java.util.Map;

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
    public Attendance markAttendance(@RequestBody Map<String, Object> payload) {
        // Handle potential nulls or different number types from JSON
        Long userId = Long.valueOf(payload.get("userId").toString());
        String status = payload.get("status").toString();
        
        // Default classId to 1L if not provided
        Long classId = payload.get("classId") != null ? 
                       Long.valueOf(payload.get("classId").toString()) : 1L;
        
        Attendance attendance = new Attendance();
        
        // These methods now exist explicitly in the model
        attendance.setUserId(userId); 
        attendance.setClassId(classId);
        attendance.setStatus(status);
        attendance.setDate(LocalDate.now()); 
        
        return attendanceRepository.save(attendance);
    }
}