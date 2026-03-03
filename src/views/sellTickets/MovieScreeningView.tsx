import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getScreeningByMoviePath } from '@/api'
import { useSell } from '@/hooks/useSell';
import { useParams } from 'react-router';
import ChooseScreening from '@/components/screening/ChooseScreening';


export default function MovieScreeningView() {
    const { dispatch} = useSell()
    const { moviePath } = useParams()

    const { data } = useQuery({
        queryKey: ['screening', moviePath],
        retry: false,
        queryFn: () => getScreeningByMoviePath(moviePath!, 'active'),
    })

    useEffect(() => {
        dispatch({ type: 'resetSellData' })
    }, [])

    if(data) return (
        <>
            <ChooseScreening screenings={data} />
        </>
    )
}
