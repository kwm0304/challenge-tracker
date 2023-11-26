package com.tracker5.service;

import org.springframework.web.multipart.MultipartFile;

public interface EmailService {
    void sendReminder(String name, String to, String[] tasks);
}
