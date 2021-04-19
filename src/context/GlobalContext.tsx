import * as React from 'react'
import { GlobalReducer } from "./GlobalReducer";

export type GlobalContextType = {
    theme: string,
    message: string,
    username: string,
    changeTheme: (theme: string) => void,
    addUsername: (name: string) => void,
    addMessage: (msg: string) => void,
    clearMessage: () => void
}

const initialState = {
    theme: "light",
    message: "",
    username: "",
    changeTheme: () => {},
    addUsername: () => {},
    addMessage: () => {},
    clearMessage: () => {}
};

export const GlobalContext = React.createContext<GlobalContextType>(initialState);

interface Props {
    children: React.ReactNode;
}

const GlobalProvider:React.FC<Props> = ({ children }: Props) => {
    const [state, dispatch] = React.useReducer(GlobalReducer, initialState, undefined);

    const changeTheme = (val: string) =>{
        dispatch({
            type: "CHANGE_THEME",
            payload: val
        })
    }

    const addUsername = (val: string) =>{
        dispatch({
            type: "ADD_USERNAME",
            payload: val
        })
    }
    

    const addMessage = (name: string) =>{
        dispatch({
            type: "ADD_MESSAGE",
            payload: name
        })
    }

    const clearMessage = () =>{
        dispatch({
            type: "CLEAR_MESSAGE"
        })
    }

    return (
        <GlobalContext.Provider value={{
            theme: state.theme,
            message: state.message,
            username: state.username,
            changeTheme,
            addUsername,
            addMessage,
            clearMessage
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;