import { XMarkIcon } from "@heroicons/react/16/solid"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useSell } from "@/hooks/useSell"

interface Props {
    setCurrentDate: React.Dispatch<React.SetStateAction<string>>
    setCurrentTime: React.Dispatch<React.SetStateAction<Date>>
}

export default function SelectedScreening({ setCurrentDate, setCurrentTime } : Props) {
    const { state, dispatch } = useSell()
    const { date } = state
    const onDeleteScreeningFromState = () => {
        setCurrentDate('')
        setCurrentTime(new Date())
        dispatch({type: 'resetSellData'})
    }
    return (
        <div className='relative text-center p-4 bg-red-100 rounded-lg border border-red-400 my-7'>
            <span className=' text-gray-800 text-sm'>Función seleccionada</span>
            <p className='font-bold text-lg text-gray-800'>{format(date!, 'PPPP', { locale: es }).replace(',', '')}</p>
            <p className='font-bold text-2xl text-red-700'>{format(date!, 'p')}</p>
            <button
                className='absolute top-3 right-3 cursor-pointer'
                onClick={ onDeleteScreeningFromState }
            >
                <XMarkIcon width={25} className='text-gray-600' />
            </button>
        </div>
    )
}
