package com.seenema.backend.AddMoviesToFriendsSuggestionsList.model;


public class RequestBody {
    private String username;
    private String friendUsername;
    private String movieId;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFriendUsername() {
        return friendUsername;
    }

    public void setFriendUsername(String friendUsername) {
        this.friendUsername = friendUsername;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String MovieId) {
        this.movieId = movieId;
    }
}
