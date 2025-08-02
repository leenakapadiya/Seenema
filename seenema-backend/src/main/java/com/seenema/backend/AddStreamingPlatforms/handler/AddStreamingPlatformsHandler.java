package com.seenema.backend.AddStreamingPlatforms.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.google.gson.Gson;
import com.seenema.backend.AddStreamingPlatforms.model.RequestBody;
import com.seenema.backend.AddStreamingPlatforms.model.Response;
import com.seenema.backend.utils.Constants;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;


public class AddStreamingPlatformsHandler implements RequestHandler<APIGatewayV2HTTPEvent, Response> {

    Gson           gson           = new Gson();
    DynamoDbClient dynamoDbClient = DynamoDbClient.builder().build();

    @Override
    public Response handleRequest(APIGatewayV2HTTPEvent input, Context context) {
        RequestBody requestBody = gson.fromJson(input.getBody(), RequestBody.class);

        // Check if both username and friendUsername exist
        if (userExists(requestBody.getUsername())) {

            // Extract platform IDs from the list of objects
            String platformsJson = gson.toJson(requestBody.getStreamingPlatforms());

            // Add a movie for the main user
            addStreamingPlatforms(requestBody.getUsername(), platformsJson);

            // Log success or handle response accordingly
            context.getLogger().log("Platforms added successfully.");

            // Return a response if needed
            return new Response("Platforms added successfully.");
        } else {
            context.getLogger().log("username does not exist in the DynamoDB table.");
            return new Response("username does not exist in the DynamoDB table.");
        }
    }

    // Helper method to check if a user exists in the DynamoDB table
    private boolean userExists(String email) {
        GetItemResponse getItemResponse = dynamoDbClient.getItem(GetItemRequest.builder()
                .tableName(Constants.DYNAMODB_TABLE)
                .key(Map.of("Email", AttributeValue.builder().s(email).build()))
                .build());

        return getItemResponse.hasItem();
    }

    // Common function to add streaming platforms list for a user
    private void addStreamingPlatforms(String username, String platformsJson) {
      Map<String, AttributeValue> key = new HashMap<>();
      key.put("Email", AttributeValue.builder().s(username).build());

      UpdateItemRequest updateItemRequest = UpdateItemRequest.builder()
              .tableName(Constants.DYNAMODB_TABLE)
              .key(key)
              .updateExpression("SET StreamingPlatforms = :platformsJson") // No space in attribute name
              .expressionAttributeValues(Map.of(
                      ":platformsJson", AttributeValue.builder().s(platformsJson).build()))
              .build();

      dynamoDbClient.updateItem(updateItemRequest);
    }
}
