// Configuration object for Amazon Cognito user pool
export const cognitoConfig = {
    UserPoolId: process.env.REACT_APP_USER_POOL ? process.env.REACT_APP_USER_POOL : "us-west-2_dummy-value",
    ClientId: process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : "dummy value",
}