import { useSell } from "@/hooks/useSell"
import type { Screening } from "@/types"
import { format, isEqual } from "date-fns"

interface Props {
    isLoading: boolean
    error: Error | null
    isError: boolean
    screenings?: Screening[]
}

export default function Showtimes({ isLoading, isError, error, screenings }: Props) {
    const { state, dispatch } = useSell()

    const handleAddSellData = ({date, id, price}: Screening) => {
        const sellData = {
            date: new Date(date),
            price: +price,
            screening_id: id
        }
        dispatch({ type: 'addScreeningData', payload: sellData})
    }
    
    if (isLoading) return <p className="mt-7">Cargando...</p>
    if (isError) return <p className="mt-7">{error!.message}</p>
    if (!screenings?.length) return <p className="mt-7">No hay funciones en esta fecha...</p>
    if (screenings) return (
        <div className='mt-7 flex gap-4 flex-wrap'>
            {
                screenings.map((screening) => (
                    <button
                        key={screening.date}
                        onClick={() => handleAddSellData(screening) }
                        className={`${state.date && isEqual(screening.date, state.date) && 'bg-red-700 text-white'} px-5 py-2 font-semibold text-gray-600 bg-gray-200 rounded-xl border border-gray-300`}
                    >
                        {format(screening.date, 'p')}
                    </button>
                ))
            }
        </div>
    )
}
