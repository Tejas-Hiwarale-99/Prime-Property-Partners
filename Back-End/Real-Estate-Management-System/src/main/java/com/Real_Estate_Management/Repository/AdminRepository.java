package com.Real_Estate_Management.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Real_Estate_Management.Entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}

