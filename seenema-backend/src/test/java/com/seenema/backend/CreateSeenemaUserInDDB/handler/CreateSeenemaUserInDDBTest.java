package com.seenema.backend.CreateSeenemaUserInDDB.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.CognitoUserPoolPostConfirmationEvent;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.reflect.Whitebox;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;

import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class CreateSeenemaUserInDDBTest {

    @Mock
    private DynamoDbClient mockDynamoDbClient;

    @Mock
    private Context mockContext;

    @Mock
    private LambdaLogger mockLambdaLogger;

    @InjectMocks
    private CreateSeenemaUserInDDB CreateSeenemaUserInDDBHandler;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        // Manually inject the DynamoDbClient mock into the AddFriendHandler
        Whitebox.setInternalState(CreateSeenemaUserInDDBHandler, "dynamoDbClient", mockDynamoDbClient);
    }

    @Test
    public void testHandleRequest() {

        // Mock the Lambda context
        when(mockContext.getLogger()).thenReturn(mockLambdaLogger);

        // Mock DynamoDBClient and PutItemResponse
        when(mockDynamoDbClient.putItem(any(PutItemRequest.class)))
                .thenReturn(PutItemResponse.builder().build());

        // Create a sample Cognito event
        CognitoUserPoolPostConfirmationEvent event = CognitoUserPoolPostConfirmationEvent.builder()
                .withRequest(CognitoUserPoolPostConfirmationEvent.Request.builder()
                        .withUserAttributes(Map.of(
                                "email", "testEmail",
                                "given_name", "test_first_name",
                                "family_name", "test_family_name"
                        ))
                        .build())
                .build();

        // Invoke the Lambda function
        CognitoUserPoolPostConfirmationEvent result = CreateSeenemaUserInDDBHandler.handleRequest(event, mockContext);

        // Verify the method was called with the expected arguments
        verify(mockDynamoDbClient).putItem(any(PutItemRequest.class));

        // Add more assertions based on the behavior of your handleRequest method if needed
        // For example, you can check if the result is the same as the input event
        assertEquals(event, result);
    }
}
