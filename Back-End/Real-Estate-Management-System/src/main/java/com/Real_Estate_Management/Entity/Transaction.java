package com.Real_Estate_Management.Entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data 
@Table(name = "transactions")
public class Transaction {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO) // or UUID if you're using UUID
    private UUID id;

	// Mapping to Booking
    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    private double amount;
    private String paymentMethod; // MOCK_UPI / MOCK_CARD
    private String paymentStatus; // e.g., SUCCESS, FAILED
    private LocalDateTime transactionDate;
}

