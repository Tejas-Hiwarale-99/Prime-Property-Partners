package com.Real_Estate_Management.Entity;

import java.time.LocalDateTime;

import com.Real_Estate_Management.Enums.PropertyType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private PropertyType type; // RENT or SELL

    private Double price;
    private String address;
    private String city;
    private String state;
    private String pincode;
    
    private String status = "PENDING"; // Default status
    private String bookingStatus = "NOT_BOOKED"; // Default booking status

    private LocalDateTime postedAt = LocalDateTime.now();
    
    
    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;  // Store actual image bytes directly in the property table

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("properties") // 👈 this includes user while preventing loop
    private User user;


}

