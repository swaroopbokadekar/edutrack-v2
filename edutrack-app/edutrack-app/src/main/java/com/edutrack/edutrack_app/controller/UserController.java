package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.User;
import com.edutrack.edutrack_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Verified: Basic GET logic preserved
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // NEW: Method to Enroll a Student with DB Safety
    @PostMapping("/add")
    public User addStudent(@RequestBody User user) {
        // 1. Set role
        user.setRole("STUDENT");

        // 2. Fix Email (Constraint Safety)
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            String cleanName = user.getName().toLowerCase().replace(" ", "");
            user.setEmail(cleanName + "_" + System.currentTimeMillis() + "@edutrack.com");
        }

        // 3. Fix Password (Constraint Safety)
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword("1234");
        }

        return userRepository.save(user);
    }

    // NEW: Method to Remove a Student
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "Student removed successfully";
    }
}