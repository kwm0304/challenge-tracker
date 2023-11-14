package com.tracker5.dto;

import lombok.Data;
import lombok.Setter;

@Data
public class ProfileDto {
    private String username;
    private String email;
    private Long userId;
    private int dayNumber;
}
