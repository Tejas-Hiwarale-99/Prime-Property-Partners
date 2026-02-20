package com.Real_Estate_Management.Dto;

import com.Real_Estate_Management.Enums.PropertyType;

import lombok.Data;

// DTO for Property Request
@Data
public class PropertyRequestDTO {
    private String title;
    private String description;
    private PropertyType type;
    private Double price;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Long userId; // ✅ Add this
}

