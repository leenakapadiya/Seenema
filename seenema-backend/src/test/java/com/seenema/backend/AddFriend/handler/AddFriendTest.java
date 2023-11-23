package com.seenema.backend.AddFriend.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.seenema.backend.AddFriend.model.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import org.mockito.MockitoAnnotations;
import org.testng.annotations.BeforeClass;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemResponse;

import static org.mockito.ArgumentMatchers.any;

import java.util.Map;

import static org.powermock.api.mockito.PowerMockito.when;
import static org.testng.AssertJUnit.assertEquals;

public class AddFriendTest {
    @Mock
    private DynamoDbClient mockDynamoDbClient;

    @Mock
    private Context mockContext;

    @Mock
    private LambdaLogger mockLambdaLogger;

    @InjectMocks
    private AddFriendHandler mockAddFriendHandler;

    @BeforeEach
    public void setUp() {
        // Initialize mocks
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testHandleRequest() {
        // Create a sample valid APIGatewayV2HTTPEvent
        APIGatewayV2HTTPEvent apiGatewayEvent = APIGatewayV2HTTPEvent.builder()
                .withBody("{" +
                            "\"username\": \"lpagdar@uw.edu\"," +
                            "\"friendUsername\": \"dgpagdar@uw.edu\"" +
                        "}")
                .build();

        // Mock the Lambda context
        when(mockContext.getLogger()).thenReturn(mockLambdaLogger);

        // Mock the DynamoDB client behavior
        when(mockDynamoDbClient.getItem(any(GetItemRequest.class)))
                .thenReturn(GetItemResponse.builder()
                        .item(Map.of("test", AttributeValue.fromS("test")))
                        .build());
        when(mockDynamoDbClient.updateItem(any(UpdateItemRequest.class)))
                .thenReturn(UpdateItemResponse.builder().build());

        // Call the handleRequest method
        Response response = mockAddFriendHandler.handleRequest(apiGatewayEvent, mockContext);

        // Assert the expected result based on your logic
        assertEquals(response, new Response("Friend added successfully."));
    }
}
