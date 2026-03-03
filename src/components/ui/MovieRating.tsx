import { StarIcon } from '@heroicons/react/16/solid'

export default function MovieRating({value} : {value: number}) {
    return (
        <div className="text-yellow-500 font-semibold flex items-center gap-2">
            <StarIcon width={20} />
            <span>{value}</span>
        </div>
    )
}
