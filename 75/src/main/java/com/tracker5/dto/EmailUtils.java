package com.tracker5.dto;

import java.util.Arrays;

public class EmailUtils {
    public static String getEmailMessage(String name, String host, String token, String[] tasks) {
        return "Hello " + name + ",\n\nYour remaining tasks for the day are : " + Arrays.toString(tasks);
    }
}
