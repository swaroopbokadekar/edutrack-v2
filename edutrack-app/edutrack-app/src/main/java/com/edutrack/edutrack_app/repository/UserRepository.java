package com.edutrack.edutrack_app.repository;

import com.edutrack.edutrack_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Required for Login Authentication
    Optional<User> findByEmail(String email);
}