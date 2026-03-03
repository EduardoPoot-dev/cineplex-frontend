export type State = {
    screening_id: number | null
    date: Date | null
    price: number
    total: number
    seats: string[]
}

export type Actions = 
    {type: 'addScreeningData', payload: {screening_id: number, date: Date, price: number}} |
    {type: 'addSeats', payload: {seat: string}} |
    {type: 'resetSeatsData'} |
    {type: 'resetSellData'} 

export const initialState = {
    screening_id: null,
    date: null,
    price: 0,
    total: 0,
    seats: []
}

export const reducer = (state: State, action: Actions) => {
    if(action.type === 'addScreeningData') {
        return {
            ...state,
            screening_id: action.payload.screening_id,
            date: action.payload.date,
            price: action.payload.price,
        }
    }
      if(action.type === 'addSeats') {
        const newSeat = action.payload.seat
        const seatExist = state.seats.find((seat) => seat === newSeat)
        if(seatExist) {
            return {
                ...state,
                total: state.total - state.price,
                seats: state.seats.filter((seat) => seat !== newSeat)
            }
        }
        return {
            ...state,
            total: state.total + state.price,
            seats: [...state.seats, newSeat]
        }
    }

    if(action.type ==='resetSellData') {
        return initialState
    }

    if(action.type ==='resetSeatsData') {
        return {
            ...state,
            seats: []
        }
    }
    return state
}