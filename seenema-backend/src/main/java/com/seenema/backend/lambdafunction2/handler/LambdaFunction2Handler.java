package com.seenema.backend.lambdafunction2.handler;

import com.seenema.backend.lambdafunction2.model.Response;
import com.seenema.backend.lambdafunction2.model.Request;

public class LambdaFunction2Handler {

    public Response handleRequest(Request request) {
        // Your Lambda function logic goes here
        String greeting = "Hello, " + request.getName() + "!";
        return new Response(greeting);
    }
}
