package com.Real_Estate_Management.Controllers;

import java.util.List;

import org.slf4j.Logger; // Import SLF4J Logger
import org.slf4j.LoggerFactory; // Import LoggerFactory

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Real_Estate_Management.Dto.PropertyRequestDTO;
import com.Real_Estate_Management.Entity.Property;
import com.Real_Estate_Management.Service.PropertyService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * REST Controller for managing property-related API endpoints.
 * Handles requests for adding, fetching, and managing properties.
 */
@RestController
@RequestMapping("/api/property")
public class PropertyController {

    // Initialize an SLF4J logger for this class.
    private static final Logger logger = LoggerFactory.getLogger(PropertyController.class);

    // Autowired PropertyService to handle business logic for properties.
    @Autowired
    private PropertyService propertyService;

    /**
     * Endpoint to add a new property to the database.
     * It consumes multipart form data, including a JSON part for property details
     * and a file part for the property image.
     *
     * @param propertyDtoJson A JSON string representing the PropertyRequestDTO.
     * @param image The MultipartFile containing the property image.
     * @return ResponseEntity indicating the success or failure of the operation.
     */
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addProperty(
            @RequestPart("dto") String propertyDtoJson,
            @RequestPart("image") MultipartFile image) {
        logger.info("Received request to add a new property.");
        try {
            // Convert the JSON string propertyDtoJson to a PropertyRequestDTO object.
            PropertyRequestDTO dto = new ObjectMapper().readValue(propertyDtoJson, PropertyRequestDTO.class);
            logger.debug("Successfully parsed PropertyRequestDTO from JSON: {}", dto.getTitle());

            // Call the service layer to save the property and its image.
            propertyService.saveProperty(dto, image);
            logger.info("Property '{}' posted successfully.", dto.getTitle());
            return ResponseEntity.ok("Property posted successfully.");
        } catch (Exception e) {
            // Log the error and return an internal server error response.
            logger.error("Error adding property: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("❌ Error: " + e.getMessage());
        }
    }

    /**
     * Endpoint to fetch all properties associated with a specific user ID.
     *
     * @param userId The ID of the user whose properties are to be retrieved.
     * @return A List of Property objects owned by the specified user.
     */
    @GetMapping("/user/{userId}")
    public List<Property> getUserProperties(@PathVariable Long userId) {
        logger.info("Received request to fetch properties for userId: {}", userId);
        // Delegate the call to the service layer to get properties by user ID.
        List<Property> properties = propertyService.getPropertiesByUserId(userId);
        logger.debug("Returning {} properties for userId: {}", properties.size(), userId);
        return properties;
    }
    
    /**
     * Endpoint to fetch the image of a specific property by its ID.
     *
     * @param propertyId The ID of the property whose image is to be retrieved.
     * @return ResponseEntity containing the image byte array with appropriate content type,
     * or a not found status if the property or image is not available.
     */
    @GetMapping("/image/{propertyId}")
    public ResponseEntity<byte[]> getPropertyImage(@PathVariable Long propertyId) {
        logger.info("Received request to fetch image for propertyId: {}", propertyId);
        // Retrieve the property from the service.
        Property property = propertyService.getPropertyById(propertyId);

        // Check if the property exists and has an image.
        if (property == null || property.getImage() == null) {
            logger.warn("Image not found for propertyId: {}", propertyId);
            return ResponseEntity.notFound().build();
        }
        
        // Return the image as a byte array with appropriate content type (JPEG or PNG based on actual image type).
        logger.debug("Returning image for propertyId: {}", propertyId);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Assuming images are JPEG; adjust if PNG or other formats are used.
                .body(property.getImage());
    }
    
    // ✅ Final Endpoint to fetch APPROVED properties of given type (RENT / SELL)
    //old code
//    @GetMapping("/type/{type}")
//    public List<Property> getApprovedPropertiesByType(@PathVariable String type) {
//        return propertyService. getApprovedPropertiesByType(type.toUpperCase());
//    }
    
    // Fetch approved properties with owner details by type
    // This endpoint returns properties along with their owners
    //Longer version with DTO
//    @GetMapping("/type-with-owner/{type}")
//    public ResponseEntity<List<PropertyWithOwnerResponse>> getPropertiesWithOwner(@PathVariable String type) {
//        List<PropertyWithOwnerResponse> response = propertyService.getApprovedPropertiesWithOwnerByType(type);
//        return ResponseEntity.ok(response);
//    }
    
    /**
     * Endpoint to fetch approved properties of a specific type, including their owner details.
     * This endpoint directly returns a list of Property entities.
     *
     * @param type The type of property (e.g., "RENT", "SELL") to filter by.
     * @return A List of approved Property objects of the specified type.
     */
    @GetMapping("/type-with-owner/{type}")
    public List<Property> getApprovedPropertiesWithOwnerByType(@PathVariable String type) {
        logger.info("Received request to fetch approved properties with owner details for type: {}", type);
        // Delegate the call to the service layer to get approved properties by type.
        List<Property> properties = propertyService.getApprovedPropertiesWithOwnerByType(type.toUpperCase());
        logger.debug("Returning {} approved properties of type: {}", properties.size(), type);
        return properties;
    }
    
    /**
     * Endpoint to retrieve a single property by its ID.
     *
     * @param propertyId The ID of the property to retrieve.
     * @return ResponseEntity containing the Property object if found,
     * or a NOT_FOUND status if the property does not exist.
     */
    @GetMapping("/{propertyId}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long propertyId) {
        logger.info("Received request to fetch property by ID: {}", propertyId);
        // Retrieve the property from the service.
        Property property = propertyService.getPropertyById(propertyId);
        if (property != null) {
            logger.debug("Property with ID {} found and returned.", propertyId);
            return ResponseEntity.ok(property); // Return OK (200) with the property.
        } else {
            logger.warn("Property with ID {} not found.", propertyId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return NOT_FOUND (404) if property is null.
        }
    }
}