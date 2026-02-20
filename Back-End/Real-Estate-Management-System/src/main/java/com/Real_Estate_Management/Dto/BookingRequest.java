package com.Real_Estate_Management.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
	private Long userId;             // ✅ Changed from UUID to Long
	private Long propertyId;         // ✅ Changed from UUID to Long
    // ❌ No need for totalAmount here
}
