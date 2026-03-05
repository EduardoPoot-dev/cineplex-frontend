import { Link, Navigate } from 'react-router'
import { useMovie } from '@/hooks/useMovie'
import { formatImageScr } from '@/utils'
import MovieDateTime from '@/components/movie/MovieDateTime'
import BackButton from '@/components/movie/MovieBackButton'

export default function MovieView() {
  const { isLoading, movie, isError } = useMovie()

  if (isLoading) return <p className='mt-7'>Cargando</p>
  if (isError) return <Navigate to='/404' />
  if (movie) return (
    <main className='container mx-auto mt-7 mb-14 lg:px-40'>
      <BackButton path='/home' text='Volver al inicio' />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10 my-7 p-2 md:p-0'>
        <figure>
          <img src={formatImageScr(movie.image)} alt={movie.name} className='rounded-2xl h-full object-cover mx-auto md:mx-0' />
        </figure>

        <div className='col-span-2'>

          <h1 className='text-6xl font-bold mt-8'>{movie.name}</h1>

          <MovieDateTime
            minutesDuration={movie.minutesDuration}
            hoursDuration={movie.hoursDuration}
            premiereDate={movie.premiereDate}
          />

          <Link
            to={`/movie/${movie.path}/screening`}
            className='w-fit block mt-6 px-8 py-3 text-white font-semibold bg-red-700 rounded-xl'
          >
            Comprar boletos
          </Link>

          <dl className='mt-6 border-t border-gray-200 py-5'>
            <dt className='font-semibold text-gray-800'>Director</dt>
            <dd className='text-gray-600'>{movie.director}</dd>
          </dl>

          <dl className='border-t border-gray-200 py-5'>
            <dt className='font-semibold text-gray-800'>Sinopsis</dt>
            <dd className=' text-gray-600 mt-2'>
              {movie.description}
            </dd>
          </dl>
        </div>
      </div>
    </main>
  )
}
