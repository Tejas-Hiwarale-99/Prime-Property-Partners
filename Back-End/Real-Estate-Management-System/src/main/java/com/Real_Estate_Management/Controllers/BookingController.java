package com.Real_Estate_Management.Controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Real_Estate_Management.Dto.BookingRequest;
import com.Real_Estate_Management.Dto.BookingResponse;
import com.Real_Estate_Management.Entity.Booking;
import com.Real_Estate_Management.Service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {

        if (request.getUserId() == null || request.getPropertyId() == null) {
            return ResponseEntity.badRequest().body("User ID and Property ID are required.");
        }

        Booking booking = bookingService.createBooking(request);

//        BookingResponse response = new BookingResponse(
//            booking.getId(),
//            booking.getTotalAmount(), null, null, null, null, null,null
//        );
        
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setTotalAmount(booking.getTotalAmount());


        return ResponseEntity.ok(response);
    }
    
    //get booking by ID
    @GetMapping("/user/{userId}")
    public List<BookingResponse> getUserBookings(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }
    
    //cancel booking
    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable UUID bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok("Booking cancelled successfully.");
    }


}

