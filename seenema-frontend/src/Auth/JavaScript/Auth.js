import {AuthenticationDetails, CognitoUser, CognitoUserPool,} from "amazon-cognito-identity-js"
import {cognitoConfig} from "./CognitoConfig"


// creates a CognitoUserPool instance with cognito configurations
const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId,
})

// handles user sign up
export function signUp(firstname, lastname, email, password) {
    return new Promise((resolve, reject) => {
        // Check if the password meets the criteria
        if (!isPasswordValid(password)) {
            const errorMessage = "Your password must meet the following criteria:\n" +
                "• At least 8 characters long\n" +
                "• 1 uppercase letter\n" +
                "• 1 lowercase letter\n" +
                "• 1 number";

            const error = new Error(errorMessage);
            reject(error);
            return;
        }

        // calls signUp function on the user pool instance
        userPool.signUp(
            email,
            password,
            [{Name: "given_name", Value: firstname}, {Name: "family_name", Value: lastname}, {
                Name: "email",
                Value: email
            }],
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

// handles confirm signup
export function confirmSignUp(email, code) {
    return new Promise((resolve, reject) => {
        // creates a cognitoUser instance with the email given
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        })
        //  calls confirmRegistration function on the cognitoUser instance
        cognitoUser.confirmRegistration(code, false, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

// handles user sign in
export function signIn(email, password) {
    return new Promise((resolve, reject) => {
        // create authenticationDetails instance with the email  and password given
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        })

        // creates a cognitoUser instance with the email given
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        })

        //  calls authenticateUser function on the cognitoUser instance
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

// handles forgotPassword
export function forgotPassword(email) {
    return new Promise((resolve, reject) => {
        // creates a cognitoUser instance with the email given
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        })
        // calls forgotPassword function on the cognitoUser instance
        cognitoUser.forgotPassword({
            onSuccess: () => {
                resolve()
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

// handles confirmPassword
export function confirmPassword(email, confirmationCode, newPassword) {
    return new Promise((resolve, reject) => {
        // creates a cognitoUser instance with the email given
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool,
        })

        // calls confirmPassword function on the cognitoUser instance
        cognitoUser.confirmPassword(confirmationCode, newPassword, {
            onSuccess: () => {
                resolve()
            },
            onFailure: (err) => {
                // Check if the error is due to password policy violation
                if (err.message.startsWith("Password does not conform to policy")) {
                    const errorMessage = "Your password must meet the following criteria:\n" +
                        "• At least 8 characters long\n" +
                        "• 1 uppercase letter\n" +
                        "• 1 lowercase letter\n" +
                        "• 1 number";

                    const customError = new Error(errorMessage);
                    reject(customError);
                } else {
                    // Handle other types of errors
                    reject(err);
                }
            },
        })
    })
}

// handles user sign out
export function signOut() {
    // Gets the current authenticated user from the cognito userpool
    // if the user exist then sign them out from the application
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
        cognitoUser.signOut();
    }
}

// gets the current user
export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser()

        if (!cognitoUser) {
            reject(new Error("No user found"))
            return
        }

        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err)
                return
            }
            cognitoUser.getUserAttributes((err, attributes) => {
                if (err) {
                    reject(err)
                    return
                }
                const userData = attributes.reduce((acc, attribute) => {
                    acc[attribute.Name] = attribute.Value
                    return acc
                }, {})

                resolve({...userData, email: userData.email})
            })
        })
    })
}

export function getSession() {
    const cognitoUser = userPool.getCurrentUser()
    return new Promise((resolve, reject) => {
        if (!cognitoUser) {
            reject(new Error("No user found"))
            return
        }
        cognitoUser.getSession((err, session) => {
            if (err) {
                reject(err)
                return
            }
            resolve(session)
        })
    })
}

// Helper function to check if the password meets the criteria
function isPasswordValid(password) {
    // Password must be at least 8 characters long, contain 1 uppercase and 1 lowercase character, and 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}


