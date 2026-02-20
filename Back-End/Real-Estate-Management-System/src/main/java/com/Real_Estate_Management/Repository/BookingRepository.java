package com.Real_Estate_Management.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Real_Estate_Management.Entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByUserId(Long userId); // ✅ Long type because User.id is Long
}
