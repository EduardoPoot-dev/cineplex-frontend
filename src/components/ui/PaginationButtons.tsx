import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useSearchParams } from "react-router";

interface Props {
    numberPages: number
}

export default function PaginationButtons({ numberPages }: Props) {
    const [searchParams, setSearchParams] = useSearchParams()

    const MIN_PAGES = 1
    const MAX_PAGES = numberPages

    const currentPage = Number(searchParams.get('page') || 1) 

    const handleChange = (value: number) => {
        const updatedPage = currentPage + value
        
        if(MIN_PAGES > updatedPage) return
        if(MAX_PAGES < updatedPage) return

       setSearchParams({page: `${updatedPage}`})
    }

    return (
        <nav className="flex justify-center gap-3">
            <button
                className="py-2 px-3 bg-red-700 cursor-pointer rounded-lg 
                hover:bg-yellow-500 text-white hover:text-gray-800 transition-colors"
                onClick={() => handleChange(-1)}
            >
                <ChevronLeftIcon width={20} />
            </button>
            <button
                className="py-2 px-3 bg-red-700 cursor-pointer rounded-lg 
                hover:bg-yellow-500 text-white hover:text-gray-800 transition-colors"
                onClick={() => handleChange(1)}
            >
                <ChevronRightIcon width={20} />
            </button>
        </nav>
    )
}
