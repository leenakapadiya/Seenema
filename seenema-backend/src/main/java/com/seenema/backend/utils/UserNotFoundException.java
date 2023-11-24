package com.seenema.backend.utils;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }

    public int getStatusCode() {
        return 400;
    }
}
