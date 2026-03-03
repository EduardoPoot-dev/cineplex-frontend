import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { getMovies } from "@/api"
import Heading from "@/components/ui/Heading"
import MoviesGrid from "@/components/movie/MovieGrid"

export default function MoviesSoonView() {
  const [searchParams] = useSearchParams({ page: '1' })
  const page = Number(searchParams.get('page') || 1) 

  const TAKE = 12
  const SKIP = (TAKE * page) - TAKE

  const { data, isLoading } = useQuery({
    queryKey: ['movies-soon', page],
    queryFn: () => getMovies({ take: TAKE, skip: SKIP, status: 'soon' })
  })
  const numberPages = data ? Math.ceil(data.count / TAKE) : 1

  return (
    <main>
      <div className='container mx-auto pt-10'>
        <Heading
          title="Próximamente"
          description="No te pierdas los próximos estrenos"
        />

        <MoviesGrid
          isloading={isLoading}
          movies={data?.rows}
          numberPages={numberPages}
        />
      </div>

    </main >
  )
}
