import React, {useContext, useState} from 'react';
import {useAuth} from "./AuthContext";

const SNRestContext = React.createContext();

export function useServiceNow() {
    return useContext(SNRestContext);
}

export function ServiceNowProvider( {children} ) {
    const [loading, setLoading] = useState(true);
    const {currentUser} = useAuth();

    function getDefaultHeader() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserToken': process.env.SERVICE_NOW_APP_TOKEN // should be encrypted and stored somewhere else
        };
    }

    function createUserUrl() {
        return process.env.SERVICE_NOW_APP_URL + "/table/imp_user";
    }

    function createUrl( type ) {
        return process.env.SERVICE_NOW_APP_URL + "/table/" + type;
    }

    function createUserBody(location) {
        return JSON.stringify({
            email: currentUser.email,
            user_id: currentUser.uid,
            location: location
        });
    }

    function createIncidentBody() {
        return JSON.stringify({
            active: true,
            createdBy: currentUser.email,
            location: "Chrome Browser"
        });
    }

    const value = {
        createUrl,
        createUserUrl,
        getDefaultHeader,
        createUserBody,
        createIncidentBody
    };

    return (
        <SNRestContext.Provider value={value}>
            {!loading && children}
        </SNRestContext.Provider>
    );
}