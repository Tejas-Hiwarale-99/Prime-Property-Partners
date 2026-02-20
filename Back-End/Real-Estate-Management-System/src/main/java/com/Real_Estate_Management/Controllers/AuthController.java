package com.Real_Estate_Management.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Real_Estate_Management.Dto.LoginRequest;
import com.Real_Estate_Management.Dto.SignupRequest;
import com.Real_Estate_Management.Service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	// Sign-up End-point
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
		return ResponseEntity.ok(authService.signup(request));
	}

	// Login End-point
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
		return ResponseEntity.ok(authService.login(request, session));
	}

	// Logout End-point
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate(); // Destroys session
		return ResponseEntity.ok("User logged out successfully!");
	}

}
