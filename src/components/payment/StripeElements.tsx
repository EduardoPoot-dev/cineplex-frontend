import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import  { useState } from 'react';
import { useNavigate } from 'react-router';

export default function StripeElements() {
    const stripe = useStripe()
    const elements = useElements()

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)

        const { paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/sell/success`
            },
            redirect: 'if_required'
        })

        setLoading(false)

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            navigate(`/sell/success`)
        }
    }
    
  return (
    <form onSubmit={handleSubmit} >
        <PaymentElement />
         <button 
            type="submit" 
            disabled={loading} 
            className='w-full mt-6 px-6 py-3 cursor-pointer disabled:opacity-60 text-white font-semibold bg-red-700 rounded-xl flex justify-center items-center gap-2'
        >
            {loading ? 'Procesando...' : 'Pagar'}
        </button>
    </form>
    
  )
}
