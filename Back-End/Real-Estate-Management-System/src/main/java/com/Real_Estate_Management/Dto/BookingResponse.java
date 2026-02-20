package com.Real_Estate_Management.Dto;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private UUID id;
    private Double totalAmount;
    //private UUID bookingId;
    private String propertyTitle;
    private String propertyLocation;
    private LocalDateTime bookingDate;
    private String status;
    private String propertyType;
    private Long propertyId;

}

