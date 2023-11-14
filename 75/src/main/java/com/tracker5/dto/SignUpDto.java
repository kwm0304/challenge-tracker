package com.tracker5.dto;



import lombok.Data;

import java.util.Set;

@Data
public class SignUpDto {

    private String username;
    private String password;
    private String email;

}