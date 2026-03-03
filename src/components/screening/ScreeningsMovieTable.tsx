import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useParams, Link } from 'react-router'
import { getScreeningByMoviePath } from '@/api'

export default function ScreeningsMovieTable() {
    const { moviePath } = useParams()
    const { data } = useQuery({
        queryKey: ['movies', moviePath!],
        queryFn: () => getScreeningByMoviePath(moviePath!)
    })
    if (data) return (
        <div>
            {!data.length ? (
                <p className="text-2xl text-center font-bold">No hay funciones creadas</p>
            ) : (
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Hora
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((screening) => (
                                    <tr key={screening.id}>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {format(screening.date, 'PPPP', { locale: es }).replace(',', '')}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {format(screening.date, 'p', { locale: es })}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link
                                                to={`/admin/movie/${moviePath}/screening/${screening.id}`}
                                                className="py-1 px-4 rounded-lg text-white font-semibold bg-green-600"
                                            >Editar</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
