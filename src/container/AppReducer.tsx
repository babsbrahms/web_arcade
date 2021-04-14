import React  from 'react'



interface State {

}

type Action = | { type: "add", payload: number} | { type: "remove", payload: number } 

export const AppReducer = (state: State, action: Action) => { 
    switch (action.type) {
        case "add": 

        case "remove":

        default:
            return state;
    }
}