package com.Real_Estate_Management.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Real_Estate_Management.Entity.Property;
import com.Real_Estate_Management.Enums.PropertyType;

// Repository interface for Property entity
public interface PropertyRepository extends JpaRepository<Property, Long> {
	// ✅ Fetch properties by userId
    List<Property> findByUserId(Long userId);
    
    // Fetch all approved properties by type (RENT or SELL and booking status NOT_BOOKED)
    //List<Property> findByTypeAndStatus(String type, String status);
    List<Property> findByTypeAndStatusAndBookingStatus(PropertyType type, String status, String bookingStatus); // ✅ Use Enum type here
}

	