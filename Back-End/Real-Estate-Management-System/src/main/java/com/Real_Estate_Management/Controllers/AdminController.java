package com.Real_Estate_Management.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Real_Estate_Management.Entity.Property;
import com.Real_Estate_Management.Entity.User;
import com.Real_Estate_Management.Service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	// End-point to get all users (admin access only)
	// This end-point is protected by Spring Security

	@GetMapping("/allUsers")
	public List<User> getAllUsers() {
		return adminService.getAllUsers();
	}

	// fetch all properties from the database with specific userId
	@GetMapping("/user/{userId}")
	public List<Property> getUserProperties(@PathVariable Long userId) {
		return adminService.getPropertiesByUserId(userId);
	}

	// fetch property image from the database
	@GetMapping("/image/{propertyId}")
	public ResponseEntity<byte[]> getPropertyImage(@PathVariable Long propertyId) {
		Property property = adminService.getPropertyById(propertyId);

		if (property == null || property.getImage() == null) {
			return ResponseEntity.notFound().build();
		}
		// Return the image as a byte array with appropriate content type
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG) // or IMAGE_PNG
				.body(property.getImage());
	}

	// End-point to update property status (admin access only)

	@PatchMapping("/property/{propertyId}/status")
	public ResponseEntity<String> updatePropertyStatus(@PathVariable Long propertyId, @RequestParam String status) {

		String response = adminService.updatePropertyStatus(propertyId, status);

		if (response.equals("Property not found")) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(response);
	}

}
