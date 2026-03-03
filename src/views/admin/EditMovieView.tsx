import { useMovie } from '@/hooks/useMovie'
import { Navigate } from 'react-router'
import EditMovie from '@/components/movie/EditMovie'

export default function EditMovieView() {
    const { movie, isError } = useMovie()
    if(isError) return <Navigate to='/404' />
    if(movie)return <EditMovie movie={movie} />
}
