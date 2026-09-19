import { ClockIcon, TicketIcon } from "@heroicons/react/24/outline"
import { useMovie } from "@/hooks/useMovie"
import { useSell } from "@/hooks/useSell"
import { format } from "date-fns"
import { es } from "date-fns/locale";
import { formatCurrency, formatImageScr } from "@/utils";
import { Navigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { ticketSell } from "@/api";
import { toast } from 'react-toastify'
import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js'
import StripeElements from "@/components/payment/StripeElements";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function ScreeningSellResume() {
    const [ disabledButton, setDisabledButton ] = useState(false)
    const { movie } = useMovie()
    const { state } = useSell()
    const { screeningId } = useParams()
    const { date, seats, total } = state
    const seatsQuantity = seats.length

    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [sellId, setSellId] = useState<number | null>(null)

    const mutation = useMutation({
        mutationFn: ticketSell,
        onSuccess: (res) => {
            setClientSecret(res?.clientSecret ?? null)
            setSellId(res?.sellId ?? null)
        },
        onError: (e) => () => {
            toast.error(e.message)
            setClientSecret(null)
            setSellId(null)
            setDisabledButton(false)
        }
    })

    const handleNewSell = () => {
        const data = {
            screeningId: state.screening_id!,
            seats: state.seats.map((seat) => ({name: seat}))
        }
        setDisabledButton(true)
        mutation.mutate(data)
    }

    if(state.screening_id !== +screeningId! || !state.seats) return <Navigate to='/home' />
    if (movie) return (
        <div>
            <h2 className="font-bold text-2xl mb-5">Resumen de tu compra</h2>
            
            <h3 className="text-red-600 text-lg font-bold mb-5">
                Modo demo: este proyecto usa Stripe en modo de pruebas. <br></br>
                Tarjeta de prueba: 4242 4242 4242 4242, MM/YY: 12/30, CVC: 123. 
            </h3>
            
            <div className= {`${!clientSecret && !sellId ? 'items-start' : 'items-start' } grid grid-cols-1 lg:grid-cols-3 py-5 gap-6 `}>
                <div className="lg:col-span-2">
                    <div className="flex gap-4 border-b border-gray-300  pb-6">
                <figure className="w-25 h-40 overflow-hidden rounded-2xl">
                    <img
                        className="w-full h-full"
                        src={formatImageScr(movie.image)}
                        alt={`Imagen de ${movie.name}`} />
                </figure>
                <div>
                    <h3 className="font-bold text-2xl">{movie.name}</h3>
                    <div className="text-gray-600 text-sm flex gap-2 mt-2">
                        <ClockIcon width={20} />
                        <span >{movie.hoursDuration}h {movie.minutesDuration}min</span>
                    </div>
                </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 items-start">
                        <div className="grid grid-cols-1 gap-4 ">
                            <dl>
                                <dt className="text-gray-600 text-sm">Horario</dt>
                                <dd className="font-semibold">{format(date!, 'p')}</dd>
                            </dl>
                            <dl>
                                <dt className="text-gray-600 text-sm">Fecha</dt>
                                <dd className="font-semibold">
                                    {format(date!, 'PPPP', { locale: es })}
                                </dd>
                            </dl>
                            <dl>
                                <dt className="text-gray-600 text-sm">Asientos</dt>
                                <dd className="font-semibold">
                                    {seats.join(', ')}
                                </dd>
                            </dl>
                        </div>

                        <div className="bg-gray-100 p-5 rounded-xl space-y-4 ">
                            <dl className="flex justify-between">
                                <dt className="text-gray-600">
                                    {`${seatsQuantity > 1 ? 'Boletos' : 'Boleto'} (${seatsQuantity})`}
                                </dt>
                                <dd className="">
                                    {formatCurrency(total)}
                                </dd>
                            </dl>
                            <dl className="flex justify-between items-center border-t border-gray-300 py-4">
                                <dt className="font-semibold">
                                    Total
                                </dt>
                                <dd className="text-2xl text-red-700 font-bold">
                                    {formatCurrency(total)}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    
                    {(!clientSecret && !sellId) && (
                        <button
                            disabled={disabledButton}
                            onClick={handleNewSell}
                            className='w-full mt-6 px-6 py-3 cursor-pointer disabled:opacity-60 text-white font-semibold bg-red-700 rounded-xl flex justify-center items-center gap-2'
                        >
                            <TicketIcon width={20} />
                            <span>Proceder al pago</span>
                        </button>
                        
                    )}
                    {(clientSecret && sellId) && (
                        <div>
                            <Elements
                                stripe={stripePromise}
                                options={{ clientSecret, appearance: { theme: 'stripe' } }}
                            >
                                 <StripeElements
                                    sellId={sellId}
                                />
                            </Elements>
                        </div>
                    )}

                
                </div>

            </div>

            {/* <div className='grid grid-cols-2 gap-4 mt-7'>
                <ScreeningBackButton
                    resetState={() => {}}
                    path={`/movie/${movie?.path}/screening/${state.screening_id}/seats`}
                />
                
            </div> */}
        </div>
    )
}
