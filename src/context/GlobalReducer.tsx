
interface State {
    theme: string,
    message: string,
    username: string
}

const initialState = {
    theme: "light",
    message: "",
    username: ""
}

type Actions = | { type: "CHANGE_THEME", payload: string } 
| { type: "ADD_USERNAME", payload: string } 
| { type: "ADD_MESSAGE", payload: string }
| { type: "CLEAR_MESSAGE" } 

export const GlobalReducer = (state: State = initialState, actions: Actions ) => {
    switch (actions.type) {
        case "CHANGE_THEME":
            return { ...state, theme: actions.payload }

        case "ADD_MESSAGE":
            return { ...state, message: actions.payload }

        case "CLEAR_MESSAGE":
            return { ...state, message: "" }

        case "ADD_USERNAME":
            return { ...state, username: actions.payload }

        default:
            return state
    }
}