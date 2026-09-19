import { CalendarIcon } from "@heroicons/react/16/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns"
import { es } from "date-fns/locale";

interface Props {
    minutesDuration: number
    hoursDuration: number
    premiereDate: string
}

export default function MovieDateTime({ minutesDuration, hoursDuration, premiereDate } : Props) {
    const date = format(new Date(premiereDate), 'PPP', {
        locale: es
    })
    
    return (
        <div className="text-gray-500 mt-8 flex gap-3">
            <div className="flex gap-3">
                <ClockIcon width={20} />
                <span>{hoursDuration}h {minutesDuration}min</span>
            </div>
            <div className="flex gap-3">
                <CalendarIcon width={20} />
                <span>{date}</span>
            </div>
        </div>
    )
}
