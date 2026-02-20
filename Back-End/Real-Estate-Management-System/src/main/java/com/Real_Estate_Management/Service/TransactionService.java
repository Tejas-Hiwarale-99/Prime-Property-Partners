package com.Real_Estate_Management.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger; // Import SLF4J Logger
import org.slf4j.LoggerFactory; // Import LoggerFactory
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Real_Estate_Management.Dto.TransactionRequest;
import com.Real_Estate_Management.Dto.TransactionResponse;
import com.Real_Estate_Management.Entity.Booking;
import com.Real_Estate_Management.Entity.Property;
import com.Real_Estate_Management.Entity.Transaction;
import com.Real_Estate_Management.Repository.BookingRepository;
import com.Real_Estate_Management.Repository.PropertyRepository;
import com.Real_Estate_Management.Repository.TransactionRepository;

/**
 * Service class for managing transaction-related operations. It primarily
 * handles the processing of mock payments and updating booking statuses.
 */
@Service
public class TransactionService {

	// Initialize an SLF4J logger for this class.
	private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

	// Autowire BookingRepository for accessing and updating booking details.
	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private PropertyRepository propertyRepository;

	// Autowire TransactionRepository for saving transaction details.
	@Autowired
	private TransactionRepository transactionRepository;

	/**
	 * Processes a mock payment for a given booking. This method simulates a
	 * successful payment, creates a transaction record, and updates the associated
	 * booking's status to "CONFIRMED".
	 *
	 * @param req The TransactionRequest DTO containing booking ID, amount, and
	 *            payment method.
	 * @return A TransactionResponse DTO with details of the processed transaction.
	 * @throws RuntimeException If the booking associated with the request ID is not
	 *                          found.
	 */
	public TransactionResponse processMockPayment(TransactionRequest req) {
		logger.info("Processing mock payment for booking ID: {} with amount: {}", req.getBookingId(), req.getAmount());

		// Step 1: Fetch Booking
		Booking booking = bookingRepository.findById(req.getBookingId()).orElseThrow(() -> {
			logger.warn("Booking not found with ID: {} during mock payment processing.", req.getBookingId());
			return new RuntimeException("Booking not found with ID: " + req.getBookingId());
		});
		logger.debug("Booking found: ID = {}, Status = {}", booking.getId(), booking.getStatus());

		// Step 2: Create Transaction Entity
		Transaction txn = new Transaction();
		txn.setBooking(booking);
		txn.setAmount(req.getAmount());
		txn.setPaymentMethod(req.getPaymentMethod());
		txn.setPaymentStatus("SUCCESS");
		txn.setTransactionDate(LocalDateTime.now());
		logger.debug("Transaction entity created with amount = {}, method = {}", req.getAmount(),
				req.getPaymentMethod());

		// Step 3: Update Booking Status
		booking.setStatus("CONFIRMED");
		bookingRepository.save(booking);
		logger.info("Booking ID: {} status updated to CONFIRMED.", booking.getId());

		// Step 4: Update Property Booking Status
		Property property = booking.getProperty();
		property.setBookingStatus("BOOKED");
		propertyRepository.save(property);
		logger.info("Property ID: {} bookingStatus updated to BOOKED.", property.getId());

		// Step 5: Save Transaction
		Transaction savedTxn = transactionRepository.save(txn);
		logger.info("Transaction ID: {} saved successfully for Booking ID: {}", savedTxn.getId(), booking.getId());

		// Step 6: Prepare Response DTO
		TransactionResponse response = new TransactionResponse();
		response.setTransactionId(savedTxn.getId());
		response.setBookingId(booking.getId());
		response.setAmount(savedTxn.getAmount());
		response.setPaymentMethod(savedTxn.getPaymentMethod());
		response.setPaymentStatus(savedTxn.getPaymentStatus());
		response.setTransactionDate(savedTxn.getTransactionDate());

		logger.debug("TransactionResponse prepared for transaction ID: {}", savedTxn.getId());

		logger.info("Mock payment processing completed for Booking ID: {}", booking.getId());

		logger.info("Transaction completed, booking and property status updated successfully.");
		return response;
	}

	// Additional methods for transaction management can be added here.

	// ✅ Fetch transactions for a given userId
	public List<TransactionResponse> getTransactionsByUserId(Long userId) {
		List<Transaction> transactions = transactionRepository.findByBooking_User_Id(userId);
		logger.info("Fetching transactions for user ID: {}", userId);
		return transactions.stream().map(tx -> {
			TransactionResponse res = new TransactionResponse();
			res.setTransactionId(tx.getId());
			res.setBookingId(tx.getBooking().getId());
			res.setAmount(tx.getAmount());
			res.setPaymentMethod(tx.getPaymentMethod());
			res.setPaymentStatus(tx.getPaymentStatus());
			res.setTransactionDate(tx.getTransactionDate());
			return res;
		}).collect(Collectors.toList());

	}

}