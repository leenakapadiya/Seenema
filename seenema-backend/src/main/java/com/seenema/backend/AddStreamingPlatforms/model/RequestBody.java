package com.seenema.backend.AddStreamingPlatforms.model;
import java.util.List;
import java.util.Map;


public class RequestBody {
    private String username;
    private List<Map<String, Object>> streamingPlatforms;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setStreamingPlatforms(List<Map<String, Object>> streamingPlatforms) {
        this.streamingPlatforms = streamingPlatforms;
    }

    public List<Map<String, Object>> getStreamingPlatforms() {
        return streamingPlatforms;
    }
}
