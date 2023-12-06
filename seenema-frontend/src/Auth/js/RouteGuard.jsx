import {useContext} from "react"
import {Navigate} from "react-router-dom"
import {AuthContext} from "./AuthContext"

// RouteGuard component to protect routes based on user authentication state
function RouteGuard({children}) {
    // Access authentication state from the AuthContext
    const {user, isLoading} = useContext(AuthContext)

    // If authentication information is still loading, render nothing
    if (isLoading) {
        return <></>
    }

    // If user is not authenticated, redirect to the signIn route
    if (!user) {
        return <Navigate to="/signIn"/>
    }

    // Render the protected route content
    return children
}

export default RouteGuard