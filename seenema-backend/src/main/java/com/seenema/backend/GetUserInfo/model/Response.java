package com.seenema.backend.GetUserInfo.model;

import java.util.List;
import java.util.Objects;

public class Response {

    private String       Email;
    private String       FirstName;
    private String       LastName;
    private String StreamingPlatforms;
    private List<String> Friends;
    private List<String> Movies;

    private List<String> MovieSuggestionsList;
    private String       message;

    // Constructors, getter, and setter methods
    public Response() {

    }

    public Response(String Email, String FirstName, String LastName, String StreamingPlatforms, List<String> Friends, List<String> Movies, List<String> MovieSuggestionsList) {
        this.Email = Email;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.StreamingPlatforms = StreamingPlatforms;
        this.Friends = Friends;
        this.Movies = Movies;
        this.MovieSuggestionsList = MovieSuggestionsList;
    }

    public Response(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Response response = (Response) o;
        return Objects.equals(Email, response.Email) &&
                Objects.equals(FirstName, response.FirstName) &&
                Objects.equals(LastName, response.LastName) &&
                Objects.equals(StreamingPlatforms, response.StreamingPlatforms) &&
                Objects.equals(Friends, response.Friends) &&
                Objects.equals(Movies, response.Movies) &&
                Objects.equals(MovieSuggestionsList, response.MovieSuggestionsList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Email, LastName, FirstName, StreamingPlatforms, Friends, Movies, MovieSuggestionsList);
    }
}
