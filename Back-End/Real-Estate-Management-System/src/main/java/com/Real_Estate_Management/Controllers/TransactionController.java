package com.Real_Estate_Management.Controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Real_Estate_Management.Dto.TransactionRequest;
import com.Real_Estate_Management.Dto.TransactionResponse;
import com.Real_Estate_Management.Service.TransactionService;

@RestController
@RequestMapping("/api/payments")
public class TransactionController {
	// Initialize an SLF4J logger for this class.
	private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);

	@Autowired
	private TransactionService transactionService;

	// ✅ Process a mock payment for a booking
	@PostMapping
	public ResponseEntity<TransactionResponse> makePayment(@RequestBody TransactionRequest request) {
		TransactionResponse response = transactionService.processMockPayment(request);
		return ResponseEntity.ok(response);
	}

	// ✅ Get all transactions for a specific user
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<TransactionResponse>> getTransactionsForUser(@PathVariable Long userId) {
		logger.info("Received GET /transactions/user/{}", userId);

		List<TransactionResponse> transactions = transactionService.getTransactionsByUserId(userId);
		return ResponseEntity.ok(transactions);
	}
}
