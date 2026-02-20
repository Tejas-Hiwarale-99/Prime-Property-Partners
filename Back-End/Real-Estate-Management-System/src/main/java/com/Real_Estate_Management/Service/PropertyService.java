package com.Real_Estate_Management.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger; // Import SLF4J Logger
import org.slf4j.LoggerFactory; // Import LoggerFactory

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Real_Estate_Management.Dto.PropertyRequestDTO;
import com.Real_Estate_Management.Entity.Property;
import com.Real_Estate_Management.Entity.User;
import com.Real_Estate_Management.Enums.PropertyType;
import com.Real_Estate_Management.Repository.PropertyRepository;
import com.Real_Estate_Management.Repository.UserRepository;

/**
 * Service class for managing property-related operations.
 * It handles the business logic for creating, fetching, and managing properties.
 */
@Service
public class PropertyService {

    // Initialize an SLF4J logger for this class.
    private static final Logger logger = LoggerFactory.getLogger(PropertyService.class);

    // Autowire PropertyRepository for database operations related to properties.
    @Autowired
    private PropertyRepository propertyRepository;

    // Autowire UserRepository for fetching user details from the database.
    @Autowired
    private UserRepository userRepository;

    /**
     * Saves a new property to the database.
     * This method associates the property with a user and stores its image.
     *
     * @param dto The PropertyRequestDTO containing property details and the associated user ID.
     * @param imageFile The MultipartFile representing the image of the property.
     * @throws IOException If there's an issue reading the image file bytes.
     * @throws RuntimeException If the specified user is not found.
     * @throws IllegalArgumentException If the image file is missing or empty.
     */
    public void saveProperty(PropertyRequestDTO dto, MultipartFile imageFile) throws IOException {
        logger.info("Attempting to save a new property: {}", dto.getTitle());

        // Get user from userId in the DTO. If the user is not found, throw a RuntimeException.
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> {
                    logger.warn("User not found for userId: {} when saving property.", dto.getUserId());
                    return new RuntimeException("User not found");
                });
        logger.debug("Found user {} for property creation.", user.getId());

        // Create a new Property entity and populate it with data from the DTO.
        Property property = new Property();
        property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setType(dto.getType());
        property.setPrice(dto.getPrice());
        property.setAddress(dto.getAddress());
        property.setCity(dto.getCity());
        property.setState(dto.getState());
        property.setPincode(dto.getPincode());
        property.setStatus("PENDING"); // Set the initial status of the property to PENDING.
        property.setPostedAt(LocalDateTime.now()); // Set the current timestamp as the posted date.
        property.setUser(user); // Set the User entity (owner) for the property.
        logger.debug("Property entity populated with DTO data. Status set to PENDING.");

        // Handle the image file.
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                property.setImage(imageFile.getBytes()); // Convert image to byte array and set it.
                logger.debug("Image bytes successfully read and set for property.");
            } catch (IOException e) {
                logger.error("Failed to read image bytes for property: {}. Error: {}", dto.getTitle(), e.getMessage());
                throw new IOException("Could not read image file", e);
            }
        } else {
            logger.error("Image file is missing or empty for property: {}", dto.getTitle());
            throw new IllegalArgumentException("Image file is missing");
        }

        // Save the property entity to the database.
        propertyRepository.save(property);
        logger.info("Property '{}' saved successfully with ID: {}", property.getTitle(), property.getId());
    }

    /**
     * Fetches a list of properties associated with a specific user ID.
     *
     * @param userId The ID of the user whose properties are to be fetched.
     * @return A list of Property entities owned by the given user.
     */
    public List<Property> getPropertiesByUserId(Long userId) {
        logger.info("Fetching properties for userId: {}", userId);
        List<Property> properties = propertyRepository.findByUserId(userId);
        logger.debug("Found {} properties for userId: {}", properties.size(), userId);
        return properties;
    }

    /**
     * Fetches a single property by its ID.
     *
     * @param propertyId The ID of the property to fetch.
     * @return The Property entity if found, otherwise null.
     */
    public Property getPropertyById(Long propertyId) {
        logger.info("Fetching property by ID: {}", propertyId);
        Property property = propertyRepository.findById(propertyId).orElse(null);
        if (property != null) {
            logger.debug("Found property with ID: {}", propertyId);
        } else {
            logger.warn("Property not found with ID: {}", propertyId);
        }
        return property;
    }
    

    // ✅ Fetch all approved properties of a given type
    //old code
//	public List<Property> getApprovedPropertiesByType(String type) {
//	    // Convert the incoming String to Enum
//	    PropertyType propertyType = PropertyType.valueOf(type.toUpperCase()); // Will throw error if invalid type
//	    return propertyRepository.findByTypeAndStatus(propertyType, "APPROVED");
//	}
	
    // Fetch approved properties with owner details by type
    //Longer version with DTO
//	public List<PropertyWithOwnerResponse> getApprovedPropertiesWithOwnerByType(String type) {
//	    PropertyType propertyType = PropertyType.valueOf(type.toUpperCase());
//	    List<Property> properties = propertyRepository.findByTypeAndStatus(propertyType, "APPROVED");
//
//	    return properties.stream().map(property -> {
//	        PropertyWithOwnerResponse response = new PropertyWithOwnerResponse();
//	        response.setId(property.getId());
//	        response.setTitle(property.getTitle());
//	        response.setDescription(property.getDescription());
//	        response.setType(property.getType());
//	        response.setPrice(property.getPrice());
//	        response.setAddress(property.getAddress());
//	        response.setCity(property.getCity());
//	        response.setState(property.getState());
//	        response.setPincode(property.getPincode());
//	        response.setStatus(property.getStatus());
//	        response.setPostedAt(property.getPostedAt());
//
//	        // Set owner details
//	        User owner = property.getUser();
//	        UserResponse ownerDTO = new UserResponse();
//	        ownerDTO.setId(owner.getId());
//	        ownerDTO.setName(owner.getName());
//	        ownerDTO.setEmail(owner.getEmail());
//	        ownerDTO.setPhone(owner.getPhone());
//	        ownerDTO.setRole(owner.getRole());
//
//	        response.setOwner(ownerDTO);
//
//	        return response;
//	    }).collect(Collectors.toList());
//	}
	
    /**
     * Fetches a list of approved properties of a specific type, including owner details.
     * This method directly returns Property entities.
     *
     * @param type The string representation of the property type (e.g., "APARTMENT", "HOUSE").
     * @return A list of Property entities that are approved and match the given type.
     * @throws IllegalArgumentException If the provided type string does not match any PropertyType enum.
     */
    public List<Property> getApprovedPropertiesWithOwnerByType(String type) {
        logger.info("Fetching approved properties with owner details for type: {}", type);
        // Convert the incoming String to PropertyType enum. This will throw an IllegalArgumentException if the type is invalid.
        PropertyType propertyType = PropertyType.valueOf(type.toUpperCase());
        logger.debug("Converted property type string '{}' to enum: {}", type, propertyType);
        
        // Fetch properties from the repository that match the type and are in "APPROVED" status.
        List<Property> properties = propertyRepository.findByTypeAndStatusAndBookingStatus(propertyType, "APPROVED", "NOT_BOOKED");
        logger.info("Found {} approved properties of type: {}", properties.size(), type);
        return properties;
    }

}