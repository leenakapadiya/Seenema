package com.seenema.backend.lambdafunction2.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.google.gson.Gson;
import com.seenema.backend.lambdafunction2.model.RequestBody;
import com.seenema.backend.lambdafunction2.model.Response;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemResponse;

import static org.mockito.ArgumentMatchers.any;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import static org.mockito.ArgumentMatchers.anyString;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.testng.AssertJUnit.assertEquals;

public class LambdaFunction2HandlerTest {
    @Mock
    private DynamoDbClient mockDynamoDbClient;

    @Mock
    private Context mockContext;

    @Test
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

        // Create an instance of the Lambda function
        LambdaFunction2Handler lambdaFunctionHandler = new LambdaFunction2Handler();
        lambdaFunctionHandler.dynamoDbClient = mockDynamoDbClient;
//        lambdaFunctionHandler.gson = new Gson();

        // Call the handleRequest method
        Response response = lambdaFunctionHandler.handleRequest(apiGatewayEvent, mockContext);


        // Assert the expected result based on your logic
        assertEquals(response, new Response("Friend added successfully."));
    }
}
