package com.seenema.backend.AddFriend.model;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Response response = (Response) o;
        return message.equals(response.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(message);
    }
}
