package com.tracker5.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    public static final String TASK_REMINDER_SUBJECT = "Your Unfinished Tasks for Today";
    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private JavaMailSender javaMailSender;



    @Override
    public void sendReminder(String name, String to, String[] tasks) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject(TASK_REMINDER_SUBJECT);
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText(getEmailMessage(name,tasks));
            javaMailSender.send(message);
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    private String getEmailMessage(String name, String[] tasks) {
        StringBuilder builder = new StringBuilder();
        builder.append("Hello ").append(name).append(".\n\n");
        builder.append("These are your remaining tasks for the day:\n");
        for (String task : tasks) {
            builder.append("- ").append(task).append("\n");
        }
        builder.append("\nComplete tasks by midnight to be counted.");
        return builder.toString();
    }
}
