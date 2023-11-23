package com.seenema.backend.CreateSeenemaUserInDDB.model;

public class Response {

    private String message;

    // Constructors, getter, and setter methods

    public Response() {
    }

    public Response(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
