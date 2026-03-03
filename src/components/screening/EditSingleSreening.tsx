import type { Screening, ScreeningFormValue } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import MovieBackButton from "@/components/movie/MovieBackButton";
import { ClockIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScreening } from "@/api";
import { toast } from "react-toastify";

interface Props {
    screening: Screening
}

export default function EditSingleSreening({screening} : Props) {
    const { register, formState: { errors }, handleSubmit } = useForm<ScreeningFormValue>({
        defaultValues: {
            date: format(new Date(screening.date), "yyyy-MM-dd'T'HH:mm"),
            price: +screening.price
        }
    })

    const { moviePath } = useParams()
    const { screeningId } = useParams()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: updateScreening,
        onSuccess: (message) => {
            toast.success(message)
            queryClient.invalidateQueries({queryKey: ['screening', screeningId]})
        }
    })

    const onSubmit: SubmitHandler<ScreeningFormValue> = (formData) => {
        const data = {
            screeningId: screening.id,
            screening: formData
        }
        mutation.mutate(data)
    }
    return (
        <div className=" bg-gray-100 h-screen">
            <div className='px-2 lg:px-0 py-5  max-w-4xl mx-auto'>
                <MovieBackButton
                    path={`/admin/movie/${moviePath}/screenings`}
                    text="Volver al panel de las funciones"
                />

                <div className="bg-white mt-5 rounded-lg p-10 border border-gray-300 mb-5">
                    <div className="mb-5">
                        <h3 className="text-2xl font-semibold leading-1.5">
                            <ClockIcon width={24} className="inline-block  text-red-700 mr-2" />
                            Añadir funciones
                        </h3>
                        <span className="text-gray-600 mt-2">Crea nuevas funciones para la película</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input
                                type={'datetime-local'}
                                {...register('date', { required: 'La fecha es obligatoria' })}
                                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 block"
                            />
                            {errors.date && <p className='text-red-600 text-sm'>{errors.date.message}</p>}
                        </div>
                        <div>
                            <input
                                type={'number'}
                                {...register('price', { required: 'El precio es obligatorio', min: { value: 0, message: 'El precio debe ser mayor a 0' } })}
                                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 block"
                            />
                            {errors.price && <p className='text-red-600 text-sm'>{errors.price.message}</p>}
                        </div>
                        <input
                            type="submit"
                            value="Crear funciones"
                            className='mt-5 py-2 px-5 rounded-lg text-white font-semibold bg-red-700'
                        />
                    </form>
                </div>


            </div>
        </div>
    )
}
