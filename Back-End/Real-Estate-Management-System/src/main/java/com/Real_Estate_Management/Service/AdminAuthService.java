package com.Real_Estate_Management.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Real_Estate_Management.Dto.AdminResponse;
import com.Real_Estate_Management.Dto.LoginRequest;
import com.Real_Estate_Management.Entity.Admin;
import com.Real_Estate_Management.Repository.AdminRepository;

@Service
public class AdminAuthService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid admin email"));

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return mapToResponse(admin);
    }

    private AdminResponse mapToResponse(Admin admin) {
        AdminResponse response = new AdminResponse();
        response.setId(admin.getId());
        response.setEmail(admin.getEmail());
        response.setRole(admin.getRole());
        return response;
    }
}

