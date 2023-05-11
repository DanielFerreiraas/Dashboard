import React, { createContext, useContext, useEffect, useState } from "react";

import { User } from "../services/userServices";

interface authContextProps {
    authenticated: boolean;
    user: User;
    login: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const authContext = createContext< authContextProps>({} as authContextProps);

export const useAuth = () => useContext(authContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({} as User);
    const [isLoading, setisLoading] = useState(true);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')
        if(storedUser){
            setUser(JSON.parse(storedUser));
            setAuthenticated(true);
        }
            setisLoading(false);

    }, []);

    const login = (loggedInUser: User) => {
        setUser(loggedInUser);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
    }

    const logout = () => {
        setUser({} as User);
        setAuthenticated(false);
        localStorage.removeItem("user");
    }

    return(
        <authContext.Provider value={{authenticated, user, login , logout, isLoading}}>
            {children}
        </authContext.Provider>
    )
}