package com.edutrack.edutrack_app.controller;

import com.edutrack.edutrack_app.model.User;
import com.edutrack.edutrack_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users") // This maps the URL to localhost:8080/api/users
@CrossOrigin(origins = "http://localhost:3000") // This will be needed later for React
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // This method handles the "GET" request
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}