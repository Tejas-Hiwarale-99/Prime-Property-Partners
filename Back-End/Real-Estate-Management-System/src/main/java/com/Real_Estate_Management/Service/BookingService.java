package com.Real_Estate_Management.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.slf4j.Logger; // Import SLF4J Logger
import org.slf4j.LoggerFactory; // Import LoggerFactory
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Real_Estate_Management.Dto.BookingRequest;
import com.Real_Estate_Management.Dto.BookingResponse;
import com.Real_Estate_Management.Entity.Booking;
import com.Real_Estate_Management.Entity.Property;
import com.Real_Estate_Management.Entity.Transaction;
import com.Real_Estate_Management.Entity.User;
import com.Real_Estate_Management.Repository.BookingRepository;
import com.Real_Estate_Management.Repository.PropertyRepository;
import com.Real_Estate_Management.Repository.TransactionRepository;
import com.Real_Estate_Management.Repository.UserRepository;

/**
 * Service class for managing booking-related operations.
 * It handles the business logic for creating new property bookings.
 */
@Service
public class BookingService {

    // Initialize an SLF4J logger for this class.
    // This allows you to log messages at various levels (info, debug, warn, error).
    private static final Logger logger = LoggerFactory.getLogger(BookingService.class);

    // Autowire BookingRepository for database operations related to bookings.
    @Autowired
    private BookingRepository bookingRepository;

    // Autowire UserRepository for fetching user details from the database.
    @Autowired
    private UserRepository userRepository;

    // Autowire PropertyRepository for fetching property details from the database.
    @Autowired
    private PropertyRepository propertyRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;

    /**
     * Creates a new booking based on the provided booking request.
     *
     * @param request The BookingRequest DTO containing user ID, property ID, and other booking details.
     * @return The created and saved Booking entity.
     * @throws IllegalArgumentException if User ID or Property ID is null.
     * @throws RuntimeException if the User or Property is not found, or if a user attempts to book their own property.
     */
    public Booking createBooking(BookingRequest request) {
        logger.info("Attempting to create a new booking for userId: {} and propertyId: {}", request.getUserId(), request.getPropertyId());

        // Validate that essential IDs are not null before proceeding.
        if (request.getUserId() == null || request.getPropertyId() == null) {
            logger.error("Attempted booking with null userId or propertyId. UserId: {}, PropertyId: {}", request.getUserId(), request.getPropertyId());
            throw new IllegalArgumentException("User ID and Property ID must not be null");
        }

        // Retrieve the User entity from the database using the provided user ID.
        // If the user is not found, throw a RuntimeException.
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> {
                    logger.warn("User not found with ID: {}", request.getUserId());
                    return new RuntimeException("User not found with ID: " + request.getUserId());
                });
        logger.debug("Found user: {} with ID: {}", user.getName(), user.getId());

        // Retrieve the Property entity from the database using the provided property ID.
        // If the property is not found, throw a RuntimeException.
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> {
                    logger.warn("Property not found with ID: {}", request.getPropertyId());
                    return new RuntimeException("Property not found with ID: " + request.getPropertyId());
                });
        logger.debug("Found property: {} with ID: {}", property.getDescription(), property.getId());
        
        // Perform an ownership check: a user cannot book a property they own.
        if (property.getUser().getId().equals(user.getId())) {
            logger.warn("User {} attempted to book their own property {}.", user.getId(), property.getId());
            throw new RuntimeException("You cannot book your own property");
        }

        // Calculate the total booking amount.
        // Get the base price from the property.
        Double basePrice = property.getPrice();
        // Calculate the total amount by adding a 25% administrative margin to the base price.
        double totalAmount = basePrice + (int)(basePrice * 0.25);
        logger.debug("Calculated total amount: {} for base price: {}", totalAmount, basePrice);

        // Create a new Booking entity and populate its fields.
        Booking booking = new Booking();
        booking.setUser(user); // Set the User entity for the booking.
        booking.setProperty(property); // Set the Property entity for the booking.
        booking.setBookingDate(LocalDateTime.now()); // Set the current timestamp as the booking date.
        booking.setStatus("PENDING"); // Set the initial status of the booking to "PENDING".
        booking.setTotalAmount(totalAmount); // Set the calculated total amount for the booking.
        logger.debug("Booking object created: {}", booking);

        // Save the newly created booking entity to the database and return it.
        Booking savedBooking = bookingRepository.save(booking);
        logger.info("Successfully created and saved booking with ID: {}", savedBooking.getId());
        return savedBooking;
    }
    
    
	/**
	 * Retrieves all bookings made by a specific user.
	 *
	 * @param userId The ID of the user for whom to retrieve bookings.
	 * @return A list of Booking entities associated with the specified user.
	 */
    
    public List<BookingResponse> getBookingsByUser(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);

        return bookings.stream().map(booking -> {
            BookingResponse response = new BookingResponse();
            response.setId(booking.getId());
            response.setBookingDate(booking.getBookingDate());
            response.setStatus(booking.getStatus());
            response.setPropertyTitle(booking.getProperty().getTitle());
            response.setPropertyType(booking.getProperty().getType().toString()); // Assuming PropertyType is an enum);
            response.setPropertyId(booking.getProperty().getId()); // ✅ Set propertyId for image URL
			response.setPropertyLocation(booking.getProperty().getDescription() + ", "
					+ booking.getProperty().getCity() + ", "
					+ booking.getProperty().getState() + ", "
					+ booking.getProperty().getPincode());
            response.setTotalAmount(booking.getTotalAmount());
            return response;
        }).collect(Collectors.toList());
    }
    
    // cancle booking
	public Booking cancelBooking(UUID bookingId) {
		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));

		// Update the status to CANCELLED
		booking.setStatus("CANCELLED");
		logger.info("Cancelling booking with ID: {}", bookingId);
		
		// Update the property booking status
		Property property = booking.getProperty();
		property.setBookingStatus("NOT_BOOKED");
		logger.info("Updating property booking status for Property ID: {}", property.getId());
		// Save the updated property
		propertyRepository.save(property);
		
		// Update the transaction payment status to REFUNDED
	    Optional<Transaction> transactionOpt = transactionRepository.findByBooking_Id(bookingId);

	    if (transactionOpt.isPresent()) {
	        Transaction transaction = transactionOpt.get();
	        transaction.setPaymentStatus("REFUNDED");
	        logger.info("Updating transaction payment status for Transaction ID: {}", transaction.getId());
	        transactionRepository.save(transaction);
	    } else {
	        logger.warn("No transaction found for booking ID: {}", bookingId);
	    }
		
		logger.info("Booking with ID: {} has been cancelled successfully.", bookingId);
		// Save the updated booking
		return bookingRepository.save(booking);
	}

	// Additional methods for booking management can be added here.
    
    
}