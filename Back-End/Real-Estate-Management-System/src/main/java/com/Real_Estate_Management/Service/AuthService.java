package com.Real_Estate_Management.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Real_Estate_Management.Dto.LoginRequest;
import com.Real_Estate_Management.Dto.SignupRequest;
import com.Real_Estate_Management.Dto.UserResponse;
import com.Real_Estate_Management.Entity.User;
import com.Real_Estate_Management.Repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	public UserResponse signup(SignupRequest request) {
		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new RuntimeException("Email already in use!");
		}

		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(request.getPassword());
		user.setPhone(request.getPhone());

		userRepository.save(user);
		return mapToResponse(user);
	}

	public UserResponse login(LoginRequest request, HttpSession session) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("Invalid email"));

		if (!user.getPassword().equals(request.getPassword())) {
			throw new RuntimeException("Incorrect password");
		}

		session.setAttribute("user", user); // Store user in session
		return mapToResponse(user);
	}

	private UserResponse mapToResponse(User user) {
		UserResponse res = new UserResponse();
		res.setId(user.getId());
		res.setName(user.getName());
		res.setEmail(user.getEmail());
		res.setPhone(user.getPhone());
		res.setRole(user.getRole());
		return res;
	}
}