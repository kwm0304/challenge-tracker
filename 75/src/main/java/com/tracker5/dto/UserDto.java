package com.tracker5.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String roles;
    private int dayNumber;
    private int numberCompleted;

    public UserDto(Long id, String username, String email, String roles, int dayNumber, int numberCompleted) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles= roles;
        this.dayNumber = dayNumber;
        this.numberCompleted = numberCompleted;
    }
}
