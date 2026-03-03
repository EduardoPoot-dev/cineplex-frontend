import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/api";
import SoonMovieCard from "@/components/movie/SoonMovieCard";
import Heading from "@/components/ui/Heading";


export default function Soon() {
    const { data } = useQuery({
        queryKey: ['movies-soon-home'],
        queryFn: () => getMovies({take: 2, skip: 0, status: 'soon'})
    })

    return (
        <div className="pt-20 pb-10 bg-gray-50">
            <Heading
                textPositionStyle="text-center"
                title="Próximamente"
                description="No te pierdas los próximos estrenos"
            />

            <div className=" px-5 lg:px-28 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    data && data.rows && (
                        data.rows.map((movie) => (
                            <SoonMovieCard 
                                key={movie.id}
                                name={movie.name} 
                                category={movie.category}
                                premiereDate={movie.premiereDate}
                                image={movie.image} 
                                path={movie.path}
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}
