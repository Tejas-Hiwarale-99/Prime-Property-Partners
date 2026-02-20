package com.Real_Estate_Management.Dto;

import lombok.Data;

@Data
public class UserDTO {
	 private Long id;
	private String name;
	private String email; // visible but not editable
	private String phone;
	private String password;
	private String confirmPassword;
}
