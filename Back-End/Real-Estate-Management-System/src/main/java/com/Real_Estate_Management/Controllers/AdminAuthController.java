package com.Real_Estate_Management.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Real_Estate_Management.Dto.LoginRequest;
import com.Real_Estate_Management.Service.AdminAuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminAuthController {

	@Autowired
	private AdminAuthService adminAuthService;

	// Login End-point
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		return ResponseEntity.ok(adminAuthService.login(request));
	}

	// Logout End-point
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate(); // Destroys session
		return ResponseEntity.ok("Logout successful");
	}
}
