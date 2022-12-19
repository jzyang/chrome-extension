import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
    console.log("Got to PrivateRoute.js")
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate replace to="/" />;
}