package com.seenema.backend.GetUserInfo.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.google.gson.Gson;
import com.seenema.backend.GetUserInfo.model.Response;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemResponse;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.junit.Assert.assertEquals;

public class GetUserInfoHandlerTest {
    @Mock
    private DynamoDbClient mockDynamoDbClient;

    @Mock
    private Context mockContext;

    @InjectMocks
    private GetUserInfoHandler mockGetUserInfoHandler;

    private Gson gson = new Gson();

//    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
    public void testHandleRequest() {
        // Create a mock DynamoDbClient
        mockDynamoDbClient = Mockito.mock(DynamoDbClient.class);

        // Create a mock context
        mockContext = Mockito.mock(Context.class);

        // Create a mock LambdaLogger
        LambdaLogger mockLambdaLogger = Mockito.mock(LambdaLogger.class);

        // Create a sample valid APIGatewayV2HTTPEvent
        APIGatewayV2HTTPEvent apiGatewayEvent = APIGatewayV2HTTPEvent.builder()
                .withBody("{" +
                            "\"Email\": \"lpagdar@uw.edu\"" +
                        "}")
                .build();

        // Mock the Lambda context
        when(mockContext.getLogger()).thenReturn(mockLambdaLogger);

        // Mock the DynamoDB client behavior
        when(mockDynamoDbClient.getItem(any(GetItemRequest.class)))
                .thenReturn(GetItemResponse.builder()
                        .item(Map.of("Email", AttributeValue.fromS("test@example.com"),
                                        "FirstName", AttributeValue.fromS("John"),
                                        "LastName", AttributeValue.fromS("Doe"),
                                        "Friends", AttributeValue.fromSs( List.of("Friend1", "Friend2", "Friend3")),
                                        "Movies", AttributeValue.fromSs( List.of("12345", "67891", "13425")))
                        )
                        .build());
        when(mockDynamoDbClient.updateItem(any(UpdateItemRequest.class)))
                .thenReturn(UpdateItemResponse.builder().build());

        // Call the handleRequest method
        String responseStr = mockGetUserInfoHandler.handleRequest(apiGatewayEvent, mockContext);
        Response response = gson.fromJson(responseStr, Response.class);


        // Assert the expected result based on your logic
        assertEquals(response, new Response("test@example.com", "Doe", "John", List.of("Friend1", "Friend2", "Friend3"),
                List.of("12345", "67891", "13425")));
    }
}
