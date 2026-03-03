import { Link, useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getCreatedMovies } from '@/api'
import PaginationButtons from '@/components/ui/PaginationButtons'

export default function MoviesTable() {
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1

    const TAKE = 10
    const SKIP = (TAKE * page) - TAKE
    const { data, isLoading } = useQuery({
        queryKey: ['admin', page],
        queryFn: () => getCreatedMovies(TAKE, SKIP)
    })
    const NUMBER_PAGES = data ? Math.ceil(data.count / TAKE) : 1

    if (isLoading) return <p>Cargando</p>
    if (data) return (
        <>
            {data.rows.length > 0 ? (
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Película
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Duración
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Fecha de estreno
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.rows.map((movie) => (
                                    <tr key={movie.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="w-20 h-35 overflow-hidden">
                                                    <img className="w-full h-full rounded-lg object-cover"
                                                        src={movie.image}
                                                        alt={movie.name} />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {movie.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {`${movie.hoursDuration}h ${movie.minutesDuration}min`}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {format(movie.premiereDate, 'PPPP', { locale: es }).replace(',', '')}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link
                                                to={`/admin/movie/${movie.path}/edit`}
                                                className="py-1 px-4 rounded-lg text-white font-semibold bg-green-600"
                                            >Editar</Link>
                                            <Link
                                                to={`/admin/movie/${movie.path}/screenings`}
                                                className="py-1 px-4 rounded-lg text-white font-semibold bg-red-700 ml-5"
                                            >Funciones</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="px-5 py-5 bg-white border-t border-gray-200 flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <PaginationButtons numberPages={NUMBER_PAGES} />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-2xl text-center font-bold mt-10">No hay películas creadas</p> 
            )}
        </>
    )
}
