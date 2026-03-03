import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import { Link } from 'react-router'

export default function MovieBackButton({path, text} : {path: string, text: string}) {
    return (
        <Link to={path} className='w-fit flex gap-5 text-sm rounded-xl text-gray-600 hover:text-gray-800 font-semibold p-4 hover:bg-yellow-500 transition-colors'>
            <ArrowLeftIcon width={20} />
            {text}
        </Link>
    )
}
