import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer"

const initState = {};

const Context = createContext(initState)


export const AppContext: React.FC<{ children: JSX.Element | null }> = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initState);

    const addVal = (val: number) => {
        dispatch({
            type: "add",
            payload: val
        })
    }
    return (
        <Context.Provider value={{
            state,
            addVal
        }}>
            {children}
        </Context.Provider>
    );
}