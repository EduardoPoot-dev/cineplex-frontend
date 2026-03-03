import { Link, useParams } from "react-router";
import MovieScreeningCard from "@/components/screening/MovieScreeningCard";
import ScreeningsMovieTable from "@/components/screening/ScreeningsMovieTable";
import MovieBackButton from "@/components/movie/MovieBackButton";

export default function AdminMovieScreeningsView() {
    const { moviePath } = useParams()
    
    return (
        <div className='container mx-auto p-4 sm:px-8'>
            <MovieBackButton 
                path='/admin' 
                text="Volver al panel de administracion"
            />
            
            <div className='py-5 flex justify-between'>
                <h2 className="text-3xl font-bold leading-tight">Funciones</h2>

                <Link
                    to={`/admin/movie/${moviePath}/screenings/new`}
                    className="py-2 px-5 bg-red-700 font-semibold text-white rounded-lg"
                >Agregar funciones</Link>
            </div>

            <MovieScreeningCard />

            <ScreeningsMovieTable />
        </div>
    )
}
