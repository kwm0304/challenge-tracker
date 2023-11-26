package com.tracker5.controller;

import com.tracker5.service.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/mail")
public class EmailController {

    private EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }



}
