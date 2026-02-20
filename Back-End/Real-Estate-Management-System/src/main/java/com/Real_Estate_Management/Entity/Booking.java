package com.Real_Estate_Management.Entity;

import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "bookings")
public class Booking {

	@Id
	// Generate a unique identifier for each booking
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "property_id", nullable = false)
	private Property property;

	private LocalDateTime bookingDate;

	private String status; // PENDING, CONFIRMED, CANCELLED

	private Double totalAmount; // Total amount for the booking
	
	// Additional fields can be added as per requirements

}
