package com.Real_Estate_Management.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Real_Estate_Management.Entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
	Optional<Transaction> findByBooking_Id(UUID bookingId);
	
	// 👇 Custom query to find transactions by user ID (via booking → user)
    List<Transaction> findByBooking_User_Id(Long userId);
}
