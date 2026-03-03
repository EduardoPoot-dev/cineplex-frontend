import { createContext, useReducer, type ActionDispatch } from "react";
import { initialState, reducer, type Actions, type State } from "@/reducer/reducer";

type ContextProps = {
    state: State 
    dispatch: ActionDispatch<[action: Actions]>
}

export const Context = createContext<ContextProps>(null!)

export default function Provider({ children } : { children: React.ReactNode}) {
    const [ state, dispatch] = useReducer(reducer, initialState)

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}