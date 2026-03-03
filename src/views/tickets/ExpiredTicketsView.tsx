import { useQuery } from "@tanstack/react-query"
import { getUserTickets } from "@/api"
import TicketCard from "@/components/tickets/TicketCard"

export default function ExpiredTicketsView() {
  const status = 'expired'
  const { data, isLoading } = useQuery({
    queryKey: ['tickets', status],
    queryFn: () => getUserTickets(status)
  })
  if (isLoading) return <p>Cargando</p>
  if (data) return (
    <div className="space-y-10">
      {!data.length && <p className="text-2xl text-center font-bold">No hay boletos comprados</p> }
      {data.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} status={status} />
      ))}
    </div>
  )
}
