package com.seenema.backend.CreateSeenemaUserInDDB.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.CognitoUserPoolPostConfirmationEvent;
import com.seenema.backend.utils.Constants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.hamcrest.MockitoHamcrest.argThat;
import static org.testng.AssertJUnit.assertEquals;

public class CreateSeenemaUserInDDBTest {

    private DynamoDbClient mockDynamoDbClient;

    @Mock
    private Context mockContext;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testHandleRequest() {
        // Create a mock DynamoDbClient
        mockDynamoDbClient = Mockito.mock(DynamoDbClient.class);
        // Mock DynamoDBClient and PutItemResponse
        when(mockDynamoDbClient.putItem(any(PutItemRequest.class)))
                .thenReturn(PutItemResponse.builder().build());

        // Create a mock LambdaLogger
        LambdaLogger mockLambdaLogger = Mockito.mock(LambdaLogger.class);

        // Mock the Lambda context
        PowerMockito.when(mockContext.getLogger()).thenReturn(mockLambdaLogger);

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

        // Create the Lambda function instance
        CreateSeenemaUserInDDB lambda = new CreateSeenemaUserInDDB();
        lambda.dynamoDbClient = mockDynamoDbClient;

        // Invoke the Lambda function
        CognitoUserPoolPostConfirmationEvent result = lambda.handleRequest(event, mockContext);

        // Verify the method was called with the expected arguments
        verify(mockDynamoDbClient).putItem(any(PutItemRequest.class));

        // Add more assertions based on the behavior of your handleRequest method if needed
        // For example, you can check if the result is the same as the input event
        assertEquals(event, result);
    }
}
