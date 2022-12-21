import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    let user = localStorage.getItem("user");
    console.log(user);
    console.log(currentUser);
    if (!user) {
        user = currentUser;
    }
    return user ? children : <Navigate replace to="/login" />;
}