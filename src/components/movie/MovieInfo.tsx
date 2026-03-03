import { StarIcon } from '@heroicons/react/16/solid'

interface Props {
    status?: string
    rating: number
}

export default function MovieInfo({ status, rating } : Props) {
  return (
    <div className="flex gap-3">
        {status && (
            <span className="px-4 py-1 border border-red-400 bg-red-200 rounded-3xl text-red-700 font-semibold">
                {status}
            </span>
        )}
        <div className="text-yellow-500 font-semibold flex items-center gap-2">
            <StarIcon width={20} />
            <span>{rating}</span>
        </div>
    </div>
  )
}
