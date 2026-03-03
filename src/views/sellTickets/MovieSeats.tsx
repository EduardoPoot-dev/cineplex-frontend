import { Navigate, useParams } from "react-router"
import { formatSeatName } from "@/utils"
import { useQuery } from "@tanstack/react-query"
import { useMovie } from "@/hooks/useMovie"
import { getOccupiedSeats } from "@/api"
import { useSell } from "@/hooks/useSell"
import CinemaLettersRows from "@/components/seats/CinemaLettersRows"
import SelectedSeat from "@/components/seats/SelectedSeat"
import ScreeningBackButton from "@/components/screening/ScreeningBackButton"
import ScreeningContinueButton from "@/components/screening/ScreeningContinueButton"

export default function MovieSeats() {
    const { movie } = useMovie()
    const { state, dispatch } = useSell()
    const { screeningId } = useParams()
    const { seats } = state
    const { data } = useQuery({
        queryKey: ['seats', screeningId],
        queryFn: () => getOccupiedSeats(+screeningId!)
    })
    const handleChooseSeats = (seatName: string) => {
        dispatch({ type: 'addSeats', payload: { seat: seatName } })
    }
    const handleResetSeats = () => {
        dispatch({type: 'resetSeatsData'})
    }
    if(state.screening_id !== +screeningId!) return <Navigate to='/home' />
    if (movie && data) return (
        <div >
            <h2 className='text-2xl font-bold text-center'>Selecciona tus asientos</h2>
            <div className="w-full overflow-hidden overflow-x-scroll lg:overflow-auto lg:overflow-x-auto">
                <div className="w-210 lg:w-full p-5 flex justify-center gap-3">
                    <CinemaLettersRows />
                    <div className="w-2/3 grid grid-cols-12 p-2 gap-3">
                        {
                            data.map((seat) => {
                                const isSelectedSeat = seats.includes(seat.name)
                                return (
                                    <button
                                        key={seat.name}
                                        disabled={!seat.available}
                                        onClick={() => handleChooseSeats(seat.name)}
                                        className={`${isSelectedSeat ? 'bg-red-700 border-red-700 text-white hover:bg-red-700 hover:border-red-700' : 'bg-gray-200 border-gray-300 enabled:hover:bg-red-200 enabled:hover:border-red-700 text-gray-600 hover:text-gray-800'} disabled:opacity-60 disabled:border-gray-200 disabled:cursor-not-allowed p-2 text-sm font-semibold  cursor-pointer border-2 rounded-t-2xl  transition-colors`}>
                                        {formatSeatName(seat.name)}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <CinemaLettersRows />
            </div>
            </div>

            <div className="border-t border-gray-300 p-5 flex flex-wrap justify-center gap-3">
                <div className="flex gap-2 items-center">
                    <div className=" w-5 h-6 bg-gray-200 border-gray-300 text-gray-600 border-2 rounded-t-2xl"></div>
                    <span className="text-sm text-gray-600">Disponible</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className=" w-5 h-6 bg-red-700 border-red-700 text-white border-2 rounded-t-2xl"></div>
                    <span className="text-sm text-gray-600">Seleccionado</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="opacity-60 w-5 h-6 bg-gray-200 border-gray-200 text-gray-600 border-2 rounded-t-2xl"></div>
                    <span className="text-sm text-gray-600">Ocupado</span>
                </div>
            </div>

            {seats.length > 0 && <SelectedSeat />}

            <div className='grid grid-cols-2 gap-4 mt-5'>
                <ScreeningBackButton
                    resetState={handleResetSeats}
                    path={`/movie/${movie?.path}/screening/`}
                />
                <ScreeningContinueButton
                    disabled={!state.seats.length}
                    path={`/movie/${movie?.path}/screening/${screeningId}/seats/resume`}
                />
            </div>
        </div>
    )
}
