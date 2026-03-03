import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router'

interface Props {
    path: string
    resetState: () => void 
}

export default function ScreeningBackButton({ path, resetState } : Props) {
    const navigate = useNavigate()
    const handleClick = () => {
        resetState()
        navigate(path)
    }
    return (
        <button
            onClick={handleClick }
            className='px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 border border-gray-300 font-semibold bg-white hover:bg-yellow-500 hover:border-yellow-500 rounded-xl flex justify-center items-center gap-2 transition-colors'
        >
            <ChevronLeftIcon width={20} />
            <span>Atras</span>
        </button>
    )
}
