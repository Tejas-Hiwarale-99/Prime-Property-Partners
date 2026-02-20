package com.Real_Estate_Management.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Real_Estate_Management.Entity.Property;
import com.Real_Estate_Management.Entity.User;
import com.Real_Estate_Management.Repository.PropertyRepository;
import com.Real_Estate_Management.Repository.UserRepository;

@Service
public class AdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PropertyRepository propertyRepository;

	// Get all users
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// Fetch properties by userId
	public List<Property> getPropertiesByUserId(Long userId) {
		return propertyRepository.findByUserId(userId);
	}

	// Fetch property by ID
	public Property getPropertyById(Long propertyId) {
		return propertyRepository.findById(propertyId).orElse(null);
	}

	// Update property status
	public String updatePropertyStatus(Long propertyId, String status) {
		Property property = propertyRepository.findById(propertyId).orElse(null);

		if (property == null) {
			return "Property not found";
		}

		property.setStatus(status.toUpperCase()); // Ensure status is uppercase for consistency
		propertyRepository.save(property);

		return "Property status updated to " + status;
	}
}
