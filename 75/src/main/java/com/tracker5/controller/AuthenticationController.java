package com.tracker5.controller;


import com.tracker5.dto.AuthResponse;
import com.tracker5.dto.LoginDto;
import com.tracker5.dto.SignUpDto;
import com.tracker5.entity.User;
import com.tracker5.exception.AppException;
import com.tracker5.jwt.JwtUtils;
import com.tracker5.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public AuthResponse login(@RequestBody LoginDto loginDto) {
        String token = getToken(loginDto.getUsername(), loginDto.getPassword());
        System.out.println(token);
        return new AuthResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody SignUpDto signUpDto) {
                if (userService.hasUserWithUsername(signUpDto.getUsername())) {
                    throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
                }
                if (userService.hasUserWithEmail(signUpDto.getEmail())) {
                    throw new AppException("Email already exists", HttpStatus.BAD_REQUEST);
                }
                userService.saveUser(mapSignUpDtoToUser(signUpDto));

                String token = getToken(signUpDto.getUsername(), signUpDto.getPassword());
                return new AuthResponse(token);
    }

    private String getToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return jwtUtils.generateJwtToken(authentication);
    }

    LocalDateTime now = LocalDateTime.now();
    private User mapSignUpDtoToUser(SignUpDto signUpDto) {
        User user = new User();
        user.setUsername(signUpDto.getUsername());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        user.setCreatedDate(now);
        user.setEmail(signUpDto.getEmail());
        user.setRoles("USER");
        return user;
    }
}
