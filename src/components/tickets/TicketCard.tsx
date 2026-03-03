import { CalendarIcon, ClockIcon, TicketIcon } from "@heroicons/react/24/outline";
import type { Ticket } from "@/types";
import { format } from "date-fns"
import { es } from "date-fns/locale";
import ExpiredTicketPosterMask from "@/components/ui/ExpiredTicketPosterMask";
import { formatCurrency, formatImageScr } from "@/utils";

interface Props {
    ticket: Ticket
    status: string
}

export default function TicketCard({ ticket, status } : Props) {
  return (
    <article className="rounded-lg overflow-hidden flex shadow border border-gray-300 hover:border-red-700 transition-all">

        <figure className="w-40 relative">
            <img 
                className="w-full h-full object-cover" 
                src={formatImageScr(ticket.screening.movie.image)} 
                alt={`Poster de ${ticket.screening.movie.name}`}
            />
            
            {status === 'expired' && (
                <ExpiredTicketPosterMask />
            )}   
          
        </figure>
        
        <div className="p-10 w-full space-y-5">
            <h3 className="text-2xl font-bold">{ticket.screening.movie.name}</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                    <CalendarIcon width={20} className="text-red-700" />
                    <p className="text-gray-600">{format(new Date(ticket.screening.date), 'PPPP', { locale: es })}</p>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon width={20} className="text-red-700" />
                    <p className="text-gray-600">{format(new Date(ticket.screening.date), 'p', { locale: es })}</p>
                </div>
            </div>

            <div className="pt-5 border-t border-gray-300 flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <TicketIcon width={20} className="text-red-700" />
                    <p className="text-gray-600">Asientos: {ticket.seatsSells.map((seat) => seat.name).join(', ')}</p>
                </div>
                <dd className="text-2xl text-red-700 mt-2 font-bold">{formatCurrency(ticket.total)}</dd>
            </div>
        </div>
    </article>
  )
}
