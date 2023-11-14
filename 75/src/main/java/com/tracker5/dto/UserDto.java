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


    public UserDto(Long id, String username, String email, String roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles= roles;

    }
}
