package com.Real_Estate_Management.Dto;

import java.util.UUID;

import lombok.Data;

@Data
public class TransactionRequest {
	private UUID bookingId;         // ✅ UUID — matches Booking primary key
    private double amount;
    private String paymentMethod; // e.g., MOCK_UPI, MOCK_CARD, etc.
}
