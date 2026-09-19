import { Link } from "react-router";


export default function ScreeningPaymentStatus() {
  
  return (
    <div className="text-center mt-10 space-y-4 text-lg">
      <div className="bg-green-600 text-white font-bold py-2 w-80 mx-auto text-center">
        <h2>¡Compra confirmada!</h2>
      </div>
      <p>Tus asientos están reservados.</p>
      <Link to="/tickets/actived" className="font-semibold underline">Ver mis boletos</Link>
    </div>
  )

}
