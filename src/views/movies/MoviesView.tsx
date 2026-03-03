import { useQuery } from '@tanstack/react-query'
import Heading from '@/components/ui/Heading'
import { getMovies } from '@/api'
import { useSearchParams } from 'react-router'
import MoviesGrid from '@/components/movie/MovieGrid'

export default function MoviesView() {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const TAKE = 10
  const SKIP = (TAKE * page) - TAKE

  const { data, isLoading } = useQuery({
    queryKey: ['movies-screening', page],
    queryFn: () => getMovies({ take: TAKE, skip: SKIP, status: 'screening' })
  })

  const numberPages = data ? Math.ceil(data.count / TAKE) : 1

  return (
    <div>
      <div className='container mx-auto pt-10'>
        <Heading
          title="En cartelera"
          description="Las mejores películas del momento"
        />

        <MoviesGrid
          isloading={isLoading}
          movies={data?.rows}
          numberPages={numberPages}
        />
      </div>

    </div >
  )
}             