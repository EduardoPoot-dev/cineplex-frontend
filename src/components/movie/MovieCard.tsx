import { Link } from "react-router";
import { StarIcon } from "@heroicons/react/16/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import type { Category } from "@/types";
import { formatImageScr } from "@/utils";

interface Props {
    name: string
    image: string
    path: string
    rating: string
    minutesDuration: number
    hoursDuration: number
    category: Category
}

export default function MovieCard({name, rating, category, image, path, minutesDuration, hoursDuration}: Props) {
    return (
        <div className="relative">
            <span className="absolute z-10 p-2 bg-white opacity-90 font-semibold top-3 right-3 rounded-xl text-sm flex gap-1 items-center">
                <StarIcon className="inline-block text-yellow-500" width={20} />
                {rating}
            </span>
            <figure className="overflow-hidden rounded-xl relative group">
                <img
                    src={formatImageScr(image)}
                    alt={name}
                    className="group-hover:mask-b-from-30% group-hover:scale-110 transition-all"
                />
                <Link
                    to={`/movie/${path}`}
                    className="w-3/4 absolute left-1/2 -translate-x-1/2 group-hover:-translate-y-30 text-center inline-block mt-8 py-3 px-8 bg-red-700 text-white rounded-xl shadow-2xl shadow-red-300"
                >
                    <span className="font-semibold">Ver película</span>
                </Link>
            </figure>

            <div className="py-4">
                <h4 className="text-xl font-bold mb-2">{name}</h4>
                <div className="text-gray-500 text-sm flex items-center gap-3">
                    <div className="flex items-center">
                        <ClockIcon width={16} className=" mr-1 " />
                        <span >{hoursDuration}h {minutesDuration}min</span>
                    </div>
                    <span className="block w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span className="text-gray-500 text-sm">{category.name}</span>
                </div>
            </div>
        </div>
    )
}
