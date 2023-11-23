package com.seenema.backend.AddFriend.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.seenema.backend.AddFriend.model.Response;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.core.classloader.annotations.PrepareForTest;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.DynamoDbClientBuilder;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemResponse;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;

@PrepareForTest({DynamoDbClient.class})
public class AddFriendTest {

    @Mock
    private DynamoDbClient mockDynamoDbClient;

    @Mock
    private DynamoDbClientBuilder mockDynamoDbClientBuilder;

    @Mock
    private Context mockContext;

    @Mock
    private LambdaLogger mockLambdaLogger;

    private final AddFriendHandler addFriendHandler = new AddFriendHandler();

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        mockStatic(DynamoDbClient.class);
        when(DynamoDbClient.builder()).thenReturn(mockDynamoDbClientBuilder);
        when(mockDynamoDbClientBuilder.build()).thenReturn(mockDynamoDbClient);
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
        Response response = addFriendHandler.handleRequest(apiGatewayEvent, mockContext);

        // Assert the expected result based on your logic
        assertEquals(response, new Response("Friend added successfully."));
    }
}
