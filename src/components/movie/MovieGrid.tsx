import type { Movie } from "@/types"
import PaginationButtons from "@/components/ui/PaginationButtons"
import MovieCard from "@/components/movie/MovieCard"

interface Props {
  movies?: Movie[]
  numberPages: number
  isloading: boolean
}

export default function MoviesGrid({ movies, numberPages, isloading }: Props) {
  if (isloading) return <p>Cargando</p>
  if (movies) return (
    <div className="pb-10">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mt-7 '>
        {
          movies.map((movie) => (
            <MovieCard
              category={movie.category}
              key={movie.id}
              path={movie.path}
              name={movie.name}
              image={movie.image}
              rating={movie.rate}
              minutesDuration={movie.minutesDuration}
              hoursDuration={movie.hoursDuration}
            />
          ))
        }
      </div>
      {
        numberPages > 1 && (
          <div className='py-5'>
            <PaginationButtons numberPages={numberPages} />
          </div>
        )
      }
    </div>
  )
}
