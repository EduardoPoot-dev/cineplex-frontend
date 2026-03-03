import { useContext } from "react";
import { Context } from "@/context/Context";


export function useSell() {
    const context = useContext(Context)
    if(!context) {
        throw new Error('context not exist')
    }
    const { state, dispatch } = context
    return {
        state,
        dispatch
    }
}