package com.edutrack.edutrack_app.service;

import com.edutrack.edutrack_app.model.User;
import com.edutrack.edutrack_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        // Here you could add logic to encrypt passwords later
        return userRepository.save(user);
    }
}