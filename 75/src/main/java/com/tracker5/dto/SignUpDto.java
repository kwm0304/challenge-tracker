package com.tracker5.dto;



import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class SignUpDto {

    private String username;
    private String password;
    private String email;

}