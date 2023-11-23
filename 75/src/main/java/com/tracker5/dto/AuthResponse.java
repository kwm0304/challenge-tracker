package com.tracker5.dto;

import lombok.Getter;

@Getter
public class AuthResponse {
    private final String accessToken;
    private final boolean hasActiveChallenge;

    public AuthResponse(String accessToken, boolean hasActiveChallenge) {
        this.accessToken = accessToken;
        this.hasActiveChallenge = hasActiveChallenge;
    }


}
