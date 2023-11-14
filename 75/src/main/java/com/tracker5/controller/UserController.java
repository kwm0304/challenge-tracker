package com.tracker5.controller;

import com.tracker5.dto.ChallengeDto;
import com.tracker5.dto.UserDto;
import com.tracker5.mappers.UserMapper;
import com.tracker5.security.UserDetailsImpl;
import com.tracker5.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
//    @GetMapping("/profile/{userId}")
//    public ResponseEntity<ChallengeDto> getProfile(@PathVariable(name = "userId") Long userId) {
//
//    }
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/profile")
    public UserDto getCurrentUser(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(currentUser.getUsername()));
    }


}
