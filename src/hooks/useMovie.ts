import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getMovieByPathname } from "@/api"

export const useMovie = () => {
    const params = useParams()
    const moviePath = params.moviePath

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', moviePath],
        queryFn: () => getMovieByPathname(moviePath!),
        retry: 0
    })

    return {
        movie: data, 
        isLoading,
        moviePath,
        isError
    }
}