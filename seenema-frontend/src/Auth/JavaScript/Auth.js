import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
} from "amazon-cognito-identity-js"
import { cognitoConfig } from "./CognitoConfig"

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
})

export function signUp(firstname, lastname, email, password) {
    return new Promise((resolve, reject) => {
        userPool.signUp(
            email,
            password,
            [{Name: "given_name", Value: firstname}, {Name: "family_name", Value: lastname}, { Name: "email", Value: email }],
            null,
            (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result.user)
            }
        )
    })
}


export function confirmSignUp(email, code) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        })

        cognitoUser.confirmRegistration(code, false, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

export function signIn(email, password) {
    return new Promise((resolve, reject) => {
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        })

        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        })

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                resolve(result)
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

export function forgotPassword(username) {
    // Forgot password implementation
}

export function confirmPassword(username, code, newPassword) {
    // Confirm password implementation
}

export function signOut() {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
        cognitoUser.signOut();
    }
}

export function getCurrentUser() {
    // Get current user implementation
}

export function getSession() {

}