import { Link } from "react-router";

export default function Error404() {
    return (
        <div className="py-10">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md">

                    <div className="text-5xl font-dark font-bold">Uppsss...

                        <strong> 404 </strong>

                    </div>
                    <br />
                    <br />
                    <p
                        className="text-2xl md:text-3xl font-light leading-normal"
                    ><strong>Page Not Found</strong></p>
                    <br />
                    <br />

                    <p className="mb-8">Check if the search term is correct. If you think this is an error, contact support                 <strong>Thanks!</strong>

                        <br />
                    </p>


                    <Link to="/home" className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-red-600 active:bg-red-600 hover:bg-yellow-500 hover:text-gray-800 pointer" >
                        Volver a Inicio
                    </Link>
                </div>
                <div className="max-w-lg">

                </div>
            </div>
        </div>
    )
}
