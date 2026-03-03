import { useSell } from "@/hooks/useSell"
import { formatCurrency } from "@/utils"

export default function SelectedSeat() {
    const { state } = useSell()
    const { seats, price, total } = state
    const selectedSeatsQuantity = seats.length
    return (
        <div className='text-center p-4 bg-red-50 rounded-lg border border-red-300 text-red-700 my-7 flex justify-between'>
            <div>
                <h3 className="text-sm text-left text-gray-600 ">
                    {selectedSeatsQuantity} {selectedSeatsQuantity > 1 ? 'asientos seleccionados' : 'asiento seleccionado'}</h3>

                <div className="mt-3 flex justify-start gap-2">
                    {seats.map((seat) => (
                        <span key={seat} className="inline-block p-2 bg-red-200 rounded-2xl border border-red-300 uppercase text-sm font-semibold">
                            {seat} - {formatCurrency(+price!)}
                        </span>
                    ))}
                </div>
            </div>
            <span className="text-gray-800 text-2xl font-bold">{formatCurrency(total)} MNX</span>
        </div>
    )
}
