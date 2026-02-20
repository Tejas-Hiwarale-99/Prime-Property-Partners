package com.Real_Estate_Management.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                		 "/api/auth/**",
                         "/api/admin/auth/**",
                         "/api/logout",
                         "/api/admin/auth/logout",
                         "/api/users/**",
                         "/api/admin/**",// Allow GET for user by ID
                         "/api/property/**",
                         "/api/property/user/**", // Allow GET for user properties
                         "/api/bookings/**", // Allow POST for bookings
                         "/api/payments/**"  // Allow POST for payments
                ).permitAll()
//                .requestMatchers(
//                        "/api/property/**" // Secure Post Property APIs
//                    ).authenticated()
                    .anyRequest().authenticated()
            )
            .logout(logout -> logout
            	    .logoutUrl("/logout-dummy") //Dummy logout endpoint (never used)
            	)
            .sessionManagement(session -> session
                .maximumSessions(1) // Allow only one session per user
                .maxSessionsPreventsLogin(false) // Optional: can prevent new login if session exists
            );

        return http.build();
    }
}
