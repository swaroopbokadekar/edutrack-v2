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

    // Verified: Keep existing GET logic
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Updated: Added Try-Catch to reveal exact DB errors in console
    @PostMapping("/add")
    public User addStudent(@RequestBody User user) {
        try {
            // 1. Set default role
            user.setRole("STUDENT");

            // 2. Generate safe Email if missing
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                String cleanName = (user.getName() != null) ? user.getName().toLowerCase().replace(" ", "") : "student";
                user.setEmail(cleanName + "_" + System.currentTimeMillis() + "@edutrack.com");
            }

            // 3. Set default Password
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                user.setPassword("1234");
            }

            // 4. Save to Database
            return userRepository.save(user);
            
        } catch (Exception e) {
            // This ensures you see the EXACT SQL error in the Eclipse Console
            System.err.println("DB ERROR DURING ENROLLMENT: " + e.getMessage());
            e.printStackTrace();
            return null; 
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "Student removed successfully";
    }
}