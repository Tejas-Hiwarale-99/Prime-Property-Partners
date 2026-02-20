package com.Real_Estate_Management.Dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TransactionResponse {
    private UUID transactionId;
    private UUID bookingId;
    private double amount;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime transactionDate;
}
