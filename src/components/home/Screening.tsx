import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/movie/MovieCard";
import Heading from "@/components/ui/Heading";
import { getMovies } from "@/api";


export default function Screening() {
    const { data } = useQuery({
        queryKey: ['movies'],
        queryFn: () => getMovies({take: 5, skip: 0, status: 'screening'})
    })

    return (
        <main className="bg-gray-100 pt-14">
            <div className="container mx-auto">
                <Heading 
                    title="En cartelera"
                    description="Las mejores películas del momento"
                />

                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 py-8 px-5 md:px-0 gap-4">
                    {
                        data && data.rows && (
                            data.rows.map((movie) => (
                                <MovieCard 
                                    key={movie.id} 
                                    category={movie.category}
                                    rating={movie.rate}
                                    name={movie.name} 
                                    image={movie.image} 
                                    path={movie.path}
                                    minutesDuration={movie.minutesDuration}
                                    hoursDuration={movie.hoursDuration}
                                />
                            ))
                        )
                    }
                </div>
            </div>
        </main>
    )
}
