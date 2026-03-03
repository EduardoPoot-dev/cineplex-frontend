import { Link } from "react-router";
import MoviesTable from "@/components/screening/MoviesTable";

export default function AdminView() {
    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-5 flex justify-between'>
                <h2 className="text-3xl font-bold leading-tight">Panel de administración</h2>

                <Link
                    to='/admin/movie/new'
                    className="py-2 px-5 bg-red-700 font-semibold text-white rounded-lg"
                >Nueva película</Link>
            </div>

            <MoviesTable />
        </div>
    )
}
