package com.seenema.backend.CreateSeenemaUserInDDB.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.CognitoUserPoolPostConfirmationEvent;
import com.seenema.backend.utils.Constants;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;

import java.util.Map;
import java.util.Set;


public class CreateSeenemaUserInDDB implements RequestHandler<CognitoUserPoolPostConfirmationEvent, CognitoUserPoolPostConfirmationEvent> {
    DynamoDbClient dynamoDbClient = DynamoDbClient.builder().build();

    @Override
    public CognitoUserPoolPostConfirmationEvent handleRequest(CognitoUserPoolPostConfirmationEvent event, Context context) {
        context.getLogger().log("Received Cognito event: " + event);

        Map<String, String> userAttributes = event.getRequest().getUserAttributes();
        try {
            // Create a PutItem request
            PutItemRequest putItemRequest = PutItemRequest
                    .builder()
                    .tableName(Constants.DYNAMODB_TABLE)
                    .item(createDynamoDBItem(userAttributes.get("email"),
                            userAttributes.get("given_name"),
                            userAttributes.get("family_name"),
                            java.util.Collections.emptySet(),
                            java.util.Collections.emptySet(),
                            java.util.Collections.emptySet(),
                            java.util.Collections.emptySet()
                    ))
                    .build();

            // Execute the PutItem request
            dynamoDbClient.putItem(putItemRequest);
            context.getLogger().log("PutItem request succeeded.");

        } catch (DynamoDbException e) {
            context.getLogger().log("Error putting item into DynamoDB: " + e.getMessage());
        }
        return event;
    }

    private java.util.Map<String, AttributeValue> createDynamoDBItem(String email, String firstName, String lastName, Set<String> streamingPlatforms, Set<String> friends, Set<String> movies, Set<String> movieSuggestionsList) {
        // Create a DynamoDB item with the required attributes
        return java.util.Map.of(
                "Email", AttributeValue.builder().s(email).build(),
                "FirstName", AttributeValue.builder().s(firstName).build(),
                "LastName", AttributeValue.builder().s(lastName).build(),
                "StreamingPlatforms", AttributeValue.builder().ss(streamingPlatforms).build(),
                "Friends", AttributeValue.builder().ss(friends).build(),
                "Movies", AttributeValue.builder().ss(movies).build(),
                "MovieSuggestionsList", AttributeValue.builder().ss(movieSuggestionsList).build()
        );
    }
}

