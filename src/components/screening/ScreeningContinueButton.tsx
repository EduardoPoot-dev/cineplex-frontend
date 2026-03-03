import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router'

export default function ScreeningContinueButton({ path, disabled } : {path: string, disabled: boolean}) {
    const navigate = useNavigate()
    return (
        <button
            onClick={() => navigate(path)}
            disabled={disabled}
            className='w-full px-6 py-3 cursor-pointer disabled:opacity-60 text-white font-semibold bg-red-700 rounded-xl flex justify-center items-center gap-2'
        >
            <span>Continuar</span>
            <ChevronRightIcon width={20} />
        </button>
    )
}
