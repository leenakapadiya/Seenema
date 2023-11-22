package com.seenema.backend.AddMoviesToMyList.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.seenema.backend.AddFriend.handler.AddFriendHandler;
import com.seenema.backend.AddMoviesToMyList.model.Response;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemResponse;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.testng.AssertJUnit.assertEquals;

public class AddMoviesToMyListTest {
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
                            "\"movieId\": \"54545\"" +
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
        AddMoviesToMyListHandler lambdaFunctionHandler = new AddMoviesToMyListHandler();
        lambdaFunctionHandler.dynamoDbClient = mockDynamoDbClient;
//        lambdaFunctionHandler.gson = new Gson();

        // Call the handleRequest method
        Response response = lambdaFunctionHandler.handleRequest(apiGatewayEvent, mockContext);


        // Assert the expected result based on your logic
        assertEquals(response, new Response("Movie added successfully."));
    }
}
