import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import ScreeningBackButton from './ScreeningBackButton'
import ScreeningContinueButton from './ScreeningContinueButton'
import SelectedScreening from './SelectedScreening'
import type { Screening } from '@/types'
import { format, isEqual } from 'date-fns'
import { useSell } from '@/hooks/useSell'
import { useParams } from 'react-router'
import { useState } from 'react'
import { es } from "date-fns/locale";

interface Props {
    screenings: Screening[]
}

export default function ChooseScreening({ screenings }: Props) {
    const { state: sellData, dispatch } = useSell()
    const { moviePath } = useParams()

    const screeningsByDate = screenings.reduce<Record<string, Screening[]>>((acc, screening) => {
        const currentDate = new Date(screening.date)
        const formatedData = format(currentDate, 'PP', {locale: es})
        if (!acc[formatedData]) {
            acc[formatedData] = []
        }
        acc[formatedData].push(screening)
        return acc
    }, {})

    const [currentDate, setCurrentDate] = useState<string>('')
    const [ currentTime, setCurrentTime ] = useState<Date>(new Date())

    const onChooseDate = (screeningDate: string) => {
        setCurrentDate(screeningDate)
    }

    const onChooseTime = (screening: Screening) => {
        const formatedDate = new Date(screening.date)
        setCurrentTime(formatedDate)
        const data = {
            date: formatedDate,
            screening_id: screening.id,
            price: +screening.price
        }
        dispatch({ type: 'addScreeningData', payload: data})
    }

    return (
        <>
            <h2 className='text-xl font-bold'>Elige tu función</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                <div className='mt-5'>
                    <h3 className='flex items-center gap-2 mb-3'>
                        <CalendarIcon width={20} className='text-red-700' />
                        <span className='font-semibold'>Selecciona el dia</span>
                    </h3>

                    <div className='mt-7 flex gap-4 flex-wrap'>
                        {Object.keys(screeningsByDate).map((screening) => (
                            <button
                                key={screening}
                                onClick={() => onChooseDate(screening)}
                                className={`${screening === currentDate && 'bg-red-700 text-white'} px-5 py-2 font-semibold text-gray-600 bg-gray-200 rounded-xl border border-gray-300`}
                            >
                                {screening}
                            </button>
                        ))}
                    </div>

                </div>

                <div>
                    <h3 className='flex items-center gap-2 my-5'>
                        <ClockIcon width={20} className='text-red-700' />
                        <span className='font-semibold'>Selecciona el horario</span>
                    </h3>

                     <div className='mt-7 flex gap-4 flex-wrap'>
                        {!currentDate ? (
                            <p>Elige una fecha para mostrar las funciones disponibles</p>
                        ) : (
                            screeningsByDate[currentDate].map((screening) => (
                                <button
                                    key={screening.date}
                                    onClick={() => onChooseTime(screening)}
                                    className={`${isEqual(currentTime, screening.date) && 'bg-red-700 text-white'} px-5 py-2 font-semibold text-gray-600 bg-gray-200 rounded-xl border border-gray-300`}
                                >
                                    {format(new Date(screening.date), 'p')}
                                </button>
                            ))
                        )}
                    </div>

                </div>
            </div>

            {
                sellData.screening_id && (
                    <SelectedScreening 
                        setCurrentDate={setCurrentDate}
                        setCurrentTime={setCurrentTime}
                    />
                )
            }

            <div className='grid grid-cols-2 gap-4 mt-5'>
                <ScreeningBackButton
                    resetState={() => { }}
                    path={`/movie/${moviePath}`}
                />
                <ScreeningContinueButton
                    disabled={!sellData.screening_id}
                    path={`/movie/${moviePath}/screening/${sellData.screening_id}/seats`}
                />
            </div>
        </>
    )
}
