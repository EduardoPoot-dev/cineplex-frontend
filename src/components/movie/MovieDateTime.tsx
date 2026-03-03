import { CalendarIcon } from "@heroicons/react/16/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

interface Props {
    minutesDuration: number
    hoursDuration: number
    premiereDate: string
}

export default function MovieDateTime({ minutesDuration, hoursDuration, premiereDate } : Props) {
    const date = new Date(premiereDate)
    return (
        <div className="text-gray-500 mt-8 flex gap-3">
            <div className="flex gap-3">
                <ClockIcon width={20} />
                <span>{hoursDuration}h {minutesDuration}min</span>
            </div>
            <div className="flex gap-3">
                <CalendarIcon width={20} />
                <span>{date.getFullYear()}</span>
            </div>
        </div>
    )
}
