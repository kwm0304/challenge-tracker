package com.tracker5.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import static org.mockito.ArgumentMatchers.any;
import org.springframework.mail.javamail.MimeMessageHelper;

import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceImplTest {
    @Mock
    private JavaMailSender javaMailSender;
    @InjectMocks
    EmailServiceImpl emailService;

    @Test
    void sendReminder() {
    }

    @Test
    public void testSendEmail() throws MessagingException {
        String name = "kwm0304";
        String to = "mckenzie.kenan.90@gmail.com";
        String[] tasks = {"Task 1", "Task 2", "Task 3"};

        emailService.sendReminder(name, to, tasks);

        verify(javaMailSender).send(any(SimpleMailMessage.class));
    }
}