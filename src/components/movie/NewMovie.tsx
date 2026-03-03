import { useForm, type SubmitHandler } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { toast } from "react-toastify"
import type { MovieFormValues } from "@/types"
import { createMovie } from "@/api"
import MovieBackButton from "@/components/movie/MovieBackButton"
import MovieForm from "@/components/movie/MovieForm"

export default function NewMovie() {
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MovieFormValues>()
    
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createMovie,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['movies', 'admin', page]})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const onSubmit: SubmitHandler<MovieFormValues> = (values) => {
        mutation.mutate(values)
    }
    return (
        <div className=" bg-gray-100">
            <div className="px-2 lg:px-0 py-5  max-w-4xl mx-auto">
                <MovieBackButton path="/admin" text="Volver al panel de administración" />
                <div className="py-5 space-y-2">
                    <h1 className="inline-block text-4xl font-bold">Nueva película</h1>
                    <span className="block text-gray-600">Complete los detalles para agregar una nueva película al catálogo</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <MovieForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                    />
                    <input
                        className='block mr-0 ml-auto px-5 py-2 rounded-lg bg-red-700 font-semibold text-white text-lg'
                        type="submit"
                        value="Crear película"
                    />
                </form>
                
            </div>
        </div>
    )
}
