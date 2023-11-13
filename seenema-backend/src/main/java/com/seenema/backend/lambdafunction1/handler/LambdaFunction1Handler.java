package com.seenema.backend.lambdafunction1.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.seenema.backend.lambdafunction1.model.Request;
import com.seenema.backend.lambdafunction1.model.Response;

public class LambdaFunction1Handler implements RequestHandler<Request, Response> {

    @Override
    public Response handleRequest(Request input, Context context) {
        // Your Lambda function logic goes here
        String greeting = "Hello, " + input.getName() + "!";
        return new Response(greeting);
    }
}
