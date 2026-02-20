package com.Real_Estate_Management.Controllers;

import java.util.Optional;

import org.slf4j.Logger; // Import SLF4J Logger
import org.slf4j.LoggerFactory; // Import LoggerFactory

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Import HttpStatus for more specific responses
import org.springframework.http.ResponseEntity; // Import ResponseEntity for more control over responses
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Real_Estate_Management.Dto.UserDTO;
import com.Real_Estate_Management.Entity.User;
import com.Real_Estate_Management.Repository.UserRepository;

/**
 * REST Controller for managing user-related API endpoints.
 * Handles requests for retrieving and updating user profiles.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    // Initialize an SLF4J logger for this class.
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // Autowire UserRepository for direct database interaction with User entities.
    @Autowired
    private UserRepository userRepository;

    /**
     * Endpoint to retrieve a user's profile by ID.
     * This is typically used to pre-fill an "Update Profile" form.
     *
     * @param id The ID of the user to retrieve.
     * @return UserDTO containing selected user details.
     * @throws RuntimeException If the user with the given ID is not found.
     */
    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        logger.info("Received request to get user details for ID: {}", id);
        // Find the user by ID in the repository. If not found, throw a RuntimeException.
        User user = userRepository.findById(id)
                                    .orElseThrow(() -> {
                                        logger.warn("User not found for ID: {}", id);
                                        return new RuntimeException("User not found with id: " + id);
                                    });
        // Map the User entity to a UserDTO to return only necessary information.
        UserDTO dto = new UserDTO();
        dto.setId(user.getId()); // Set ID here
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        logger.debug("Returning UserDTO for user ID: {}", id);
        return dto;
    }

    /**
     * Endpoint to update an existing user's profile.
     * It allows updating name, phone, and optionally password.
     *
     * @param id The ID of the user whose profile is to be updated.
     * @param userDTO The UserDTO containing the updated profile information.
     * @return A String message indicating the result of the update operation.
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        logger.info("Received request to update profile for user ID: {}", id);
        // Attempt to find the user by ID.
        Optional<User> optionalUser = userRepository.findById(id);

        // If the user is not found, return an appropriate error response.
        if (optionalUser.isEmpty()) {
            logger.warn("Attempted to update profile for non-existent user ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Check if password and confirmPassword are provided and if they match.
        // This is a client-side validation check re-verified on the server.
        if (userDTO.getPassword() != null && !userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            logger.warn("Password mismatch for user ID: {}", id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password and Confirm Password do not match");
        }

        // Get the existing user entity.
        User user = optionalUser.get();
        // Update user details with values from the DTO.
        user.setName(userDTO.getName());
        user.setPhone(userDTO.getPhone());
        logger.debug("Updating name and phone for user ID: {}", id);

        // Only update password if it's provided and not empty.
        // In a real application, you would also hash the password here using a strong hashing algorithm like BCrypt.
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(userDTO.getPassword()); // Consider hashing this password
            logger.debug("Password updated for user ID: {}", id);
        }

        // Set the last updated timestamp.
        user.setUpdatedAt(java.time.LocalDateTime.now());
        // Save the updated user entity to the database.
        userRepository.save(user);

        logger.info("Profile updated successfully for user ID: {}", id);
        return ResponseEntity.ok("Profile updated successfully!");
    }
}