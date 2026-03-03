import { useMovie } from "@/hooks/useMovie"
import { formatImageScr } from "@/utils"
import { Navigate } from "react-router"

export default function MovieScreeningCard() {
    const { movie, isError } = useMovie()
    if(isError) return <Navigate to='/404' />
    if(movie) return (
        <div className='mt-4 flex items-center gap-5'>
            <figure>
                <img
                    src={formatImageScr(movie.image)}
                    alt={movie.name}
                    className='w-25 rounded-lg'
                />
            </figure>
            <div>
                <h1 className='text-4xl font-bold mb-2'>{movie.name}</h1>
                <span className='text-gray-600'>{movie.hoursDuration}h {movie.minutesDuration}min.</span>
            </div>
        </div>
    )
}