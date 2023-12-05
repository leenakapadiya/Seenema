import {createContext, useEffect, useState} from "react"
import * as auth from ".//Auth"

// Create a context for managing authentication state
const AuthContext = createContext()

// AuthProvider component to manage authentication state
function AuthProvider({children}) {
    // State variables to store user information and loading state
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Function to get the current user information
    const getCurrentUser = async () => {
        try {
            const user = await auth.getCurrentUser()
            setUser(user)
        } catch (err) {
            // not logged in
            console.log(err)
            setUser(null)
        }
    }

    // useEffect hook to run the getCurrentUser function on component mount
    useEffect(() => {
        getCurrentUser()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    }, [])

    // Function to handle user sign in
    const signIn = async (email, password) => {
        await auth.signIn(email, password)
        await getCurrentUser()
    }

    // Function to handle user sign out
    const signOut = async () => {
        await auth.signOut()
        setUser(null)
    }

    // Object containing the authentication context value
    const authValue = {
        user,
        isLoading,
        signIn,
        signOut,
    }

    // Render the AuthContext.Provider with the provided value and children
    return (
        <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
    )
}

// Export AuthProvider and AuthContext for use in other components
export {AuthProvider, AuthContext}