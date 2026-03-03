import { useForm, type SubmitHandler } from 'react-hook-form'
import { format } from 'date-fns'
import type { Movie, MovieFormValues } from '@/types'
import MovieForm from '@/components/movie/MovieForm'
import MovieBackButton from '@/components/movie/MovieBackButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMovie } from '@/api'
import { toast } from 'react-toastify'

interface Props {
    movie: Movie
}

export default function EditMovie({ movie }: Props) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MovieFormValues>({
        defaultValues: {
            name: movie.name,
            description: movie.description,
            path: movie.path,
            director: movie.director,
            rate: +movie.rate,
            premiereDate: format(new Date(movie.premiereDate), "yyyy-MM-dd"),
            image: movie.image,
            hoursDuration: movie.hoursDuration,
            minutesDuration: movie.minutesDuration,
            category_id: movie.category.id
        }
    })
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: updateMovie,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['movie', movie.path] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const onSubmit: SubmitHandler<MovieFormValues> = (formData) => {
        mutation.mutate({formData, moviePath: movie.path})
    }

    return (
        <div className=" bg-gray-100">
            <div className="px-2 lg:px-0 py-5  max-w-4xl mx-auto">
                <MovieBackButton path="/admin" text="Volver al panel de administración" />
                <div className="py-5 space-y-2">
                    <h1 className="inline-block text-4xl font-bold">Editar película</h1>
                    <span className="block text-gray-600">Realize los cambios necesarios en la película</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <MovieForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                    />
                    <input
                        className='block mr-0 ml-auto px-5 py-2 rounded-lg bg-red-700 font-semibold text-white text-lg'
                        type="submit"
                        value="Guardar cambios"
                    />
                </form>
            </div>
        </div>
    )
}
