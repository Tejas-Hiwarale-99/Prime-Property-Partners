package com.Real_Estate_Management.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Real_Estate_Management.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
