import { Link } from 'react-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { formatImageScr } from '@/utils'
import type { Category } from '@/types'
import { CalendarIcon } from '@heroicons/react/16/solid'

interface Props {
    name: string
    image: string
    premiereDate: string
    category: Category
    path: string
}

export default function SoonMovieCard({ name, image, premiereDate, category, path }: Props) {
    const date = new Date(premiereDate)
    const formatedDate = format(date, 'PP', { locale: es })
    
    return (
        <div className='rounded-xl border border-gray-300 p-6 grid grid-cols-4 gap-5 hover:border-red-700 transition-colors'>
            <figure className='col-start-1 col-end-2 rounded-xl overflow-hidden'>
                <img src={formatImageScr(image)} alt={name} className='rounded-xl h-full object-cover' />
            </figure>
            <div className='col-start-2 col-end-5 flex flex-col justify-between items-start p-3'>
                <div>
                    <h4 className='text-red-700 font-semibold text-sm mt-3'>{category.name}</h4>
                    <h3 className='text-xl font-semibold mt-3'>{name}</h3>
                    <div className='text-gray-500 mt-3'>
                        <CalendarIcon width={20} className='inline-block mr-4' />
                        <span>{formatedDate}</span>
                    </div>
                </div>
                <Link
                    to={`/movie/${path}`}
                    className="inline-block py-3 px-8 bg-gray-100 text-gray-900 rounded-xl 
                    text-sm border border-gray-200 hover:bg-yellow-500 transition-colors"
                >
                    <span className="font-semibold">Ver película</span>
                </Link>
            </div>
        </div>
    )
}
