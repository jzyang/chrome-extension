import React, {useContext, useState} from "react";
import {useAuth} from "./AuthContext";
import { Buffer } from "buffer";

/**
 * 1. Takes in args: URL depending on if Zen/Sales/SN
 * 2. Takes in the request (each of the different types call will provide their own that takes in the same args)
 * 3. use the right parse based on the type of call being made
 * 4. Shold be extensible for other services
 */

const RestContext = React.createContext();

export function useRest() {
    return useContext(RestContext);
}

export function RestProvider( {children} ) {
    const { currentUser } = useAuth();

    const [error, setError] = useState("");

    function createUser(user) {
        // const url = "https://dev122899.service-now.com/api/now/table/imp_user";
        // const url = "/imp_user"
        const url = "http://localhost:8082/serviceName/user"

        const header = {
            'Access-Control-Allow-Origin': "*",
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        }

        return fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                email: user.email,
                user_id: user.uid,
                first_name: user.firstName,
                last_name: user.lastName
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    console.log("Response: Failed to create new user")
                    const error = resp.status;
                    return Promise.reject(error);
                }

                return resp.json();
            })
            .then(data => {
                console.log(data)
                return data;
            })
            .catch(error => setError(error));
    }

    function createIncident() {
        // const url = "https://dev122899.service-now.com/api/now/table/incident";
        // const url = "/incident"
        const url = "http://localhost:8082/serviceName/incident"

        return fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                active: true,
                caller_id: currentUser.uid,
                short_description: 'Chrome extension generated case'
            })
        })
            .then(async resp => {
                if (!resp.ok) {
                    console.log("Response: Failed to create Incident")
                    const error = resp.status;
                    return Promise.reject(error);
                }

                return resp.json();
            })
            .then(data => {
                // Return the incident number
                console.log(data)
                return data.result.number;
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }

    const value = {
        createUser,
        createIncident
    };

    return (
        <RestContext.Provider value={value}>
            {children}
        </RestContext.Provider>
    );
}