import React, {useContext, useEffect, useState} from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

const AuthContext =  React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider( {children} ) {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
    const [loading, setLoading] = useState(true);

    function signup( email, password ) {
        // Return a promise
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login( email, password ) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        console.log("logout")
        console.log(currentUser)
        return signOut(auth);
    }

    function resetPassword( email ) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
            // Detect auth state change
            const unsubscribe = auth.onAuthStateChanged(user => {
                console.log("User:")
                console.log(user)
                console.log(currentUser)
                setCurrentUser(user);
                setLoading(false);
            });

            return unsubscribe;
        }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    };

    return (
       <AuthContext.Provider value={value}>
           {!loading && children}
       </AuthContext.Provider>
    );
}