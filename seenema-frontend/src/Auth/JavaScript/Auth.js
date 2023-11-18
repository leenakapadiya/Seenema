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
                reject(err)
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

                resolve({ ...userData, email: userData.email})
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

