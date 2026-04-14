package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.User;
import com.edutrack.edutrack_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // REGISTRATION API
    @PostMapping("/add")
    public ResponseEntity<?> addStudent(@RequestBody User user) {
        try {
            // Check if email already exists to prevent duplicates
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest().body("Email already registered!");
            }

            // Ensure role is formatted correctly
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("STUDENT");
            } else {
                user.setRole(user.getRole().toUpperCase());
            }

            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
            
        } catch (Exception e) {
            System.err.println("DB ERROR: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Database Error: " + e.getMessage());
        }
    }

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        Optional<User> userOpt = userRepository.findByEmail(loginData.getEmail());
        
        if (userOpt.isPresent()) {
            User dbUser = userOpt.get();
            // Verify Password and Role
            if (dbUser.getPassword().equals(loginData.getPassword()) && 
                dbUser.getRole().equalsIgnoreCase(loginData.getRole())) {
                return ResponseEntity.ok(dbUser); // Login Success
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials or role mismatch.");
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "Student removed successfully";
    }
}