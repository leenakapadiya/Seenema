package com.seenema.backend.AddFriend.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.google.gson.Gson;
import com.seenema.backend.AddFriend.model.RequestBody;
import com.seenema.backend.AddFriend.model.Response;
import com.seenema.backend.utils.Constants;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;

import java.util.HashMap;
import java.util.Map;

import static com.seenema.backend.utils.UserFunctions.userExists;


public class AddFriendHandler implements RequestHandler<APIGatewayV2HTTPEvent, Response> {

    Gson           gson           = new Gson();
    DynamoDbClient dynamoDbClient = DynamoDbClient.builder().build();

    @Override
    public Response handleRequest(APIGatewayV2HTTPEvent input, Context context) {
        RequestBody requestBody = gson.fromJson(input.getBody(), RequestBody.class);

        // Check if both username and friendUsername exist
        if (userExists(requestBody.getUsername(), dynamoDbClient)
                && userExists(requestBody.getFriendUsername(), dynamoDbClient)) {

            // Add friend for the main user
            addFriend(requestBody.getUsername(), requestBody.getFriendUsername());

            // Add reverse friendship for the friend
            addFriend(requestBody.getFriendUsername(), requestBody.getUsername());

            // Log success or handle response accordingly
            context.getLogger().log("Friend added successfully.");

            // Return a response if needed
            return new Response("Friend added successfully.");
        } else {
            context.getLogger().log("Either username or friendUsername does not exist in the DynamoDB table.");
            return new Response("Either username or friendUsername does not exist in the DynamoDB table.");
        }
    }

    // Common function to add a friend for a user
    private void addFriend(String username, String friendUsername) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put("Email", AttributeValue.builder().s(username).build());

        Map<String, AttributeValue> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":friend", AttributeValue.builder().ss(friendUsername).build());

        UpdateItemRequest updateItemRequest = UpdateItemRequest.builder()
                .tableName(Constants.DYNAMODB_TABLE)
                .key(key)
                .updateExpression("ADD Friends :friend")
                .expressionAttributeValues(Map.of(
                        ":friend", AttributeValue.builder().ss(friendUsername).build()))
                .build();

        dynamoDbClient.updateItem(updateItemRequest);
    }
}
