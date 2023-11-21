package com.seenema.backend.GetUserInfo.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.google.gson.Gson;
import com.seenema.backend.GetUserInfo.model.RequestBody;
import com.seenema.backend.GetUserInfo.model.Response;
import com.seenema.backend.utils.Constants;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class GetUserInfoHandler implements RequestHandler<APIGatewayV2HTTPEvent, String> {

    Gson gson = new Gson();
    DynamoDbClient dynamoDbClient = DynamoDbClient.builder().build();

    @Override
    public String handleRequest(APIGatewayV2HTTPEvent input, Context context) {
        try {
            // Assuming you've defined RequestBody and Response classes
            RequestBody requestBody = gson.fromJson(input.getBody(), RequestBody.class);
            String userEmail = requestBody.getEmail();
            CompletableFuture<GetItemResponse> future = CompletableFuture.supplyAsync(() -> {
                Map<String, AttributeValue> key = new HashMap<>();
                key.put("Email", AttributeValue.builder().s(userEmail).build());

                GetItemRequest getItemRequest = GetItemRequest.builder()
                        .tableName(Constants.DYNAMODB_TABLE)
                        .key(key)
                        .build();

                return dynamoDbClient.getItem(getItemRequest);
            });

            GetItemResponse response = future.get();

            if (response.hasItem()) {
                Map<String, AttributeValue> item = response.item();
                String Email = item.get("Email").s();
                String LastName = item.get("LastName").s();
                String FirstName = item.get("FirstName").s();
                List<String> Friends = item.get("Friends").ss();

                // Assuming you have a constructor in the Response class
                return gson.toJson(new Response(Email, LastName, FirstName, Friends));
            } else {
                return gson.toJson(new Response("User not found"));
            }

        } catch (DynamoDbException e) {
            context.getLogger().log("Error: " + e.getMessage());
            // Assuming you have an error constructor in the Response class
            return gson.toJson(new Response("Error retrieving user information"));
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
