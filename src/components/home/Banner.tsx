import { Link } from "react-router";
import MovieDateTime from "@/components/movie/MovieDateTime";
import { useQuery } from "@tanstack/react-query";
import { getMovieHeader } from "@/api";

export default function Banner() {
    const { data } = useQuery({
        queryKey: ['movieHeader'],
        queryFn: getMovieHeader
    })
    if(data) return (
        <section className="py-16">
            <div className="container mx-auto grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 items-center">
                <div className="row-start-2 row-end-3 md:row-start-1 md:row-end-2 p-4 sm:p-0 sm:mt-10 md:mt-0">
                    <h2 className="text-5xl md:text-6xl font-bold mt-8 w-1/2">{data.name}</h2>

                    <p className="mt-8 text-lg text-gray-600">
                        {data.description}
                    </p>

                    <MovieDateTime 
                        minutesDuration={data.minutesDuration}
                        hoursDuration={data.hoursDuration}
                        premiereDate={data.premiereDate}
                    />

                    <Link
                        to={`/movie/${data.path}`}
                        className="inline-block font-semibold mt-8 py-3 px-10 bg-red-700 text-white rounded-xl shadow-2xl shadow-red-300"
                    >
                        Ver película
                    </Link>
                </div>

                <figure className="row-start-1 row-end-2 md:row-start-1 md:row-end-2 relative">
                    <div className="hidden absolute bottom-10 left-22 xl:flex items-center justify-center rounded-full w-28 h-28 bg-yellow-500  leading-6 text-center">
                        <span className="font-bold w-3/4">!Ya en cines¡</span>
                    </div>
                    <img 
                        src={data.image}
                        className="w-6/8 sm:w-4/8 md:w-6/8 lg:w-4/8 mx-auto lg:ml-36 mr-auto rounded-xl shadow-2xl shadow-red-300"
                        alt="movie poster" 
                    />
                </figure>

            </div>
        </section>
    )
}
