import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ClockIcon } from '@heroicons/react/24/outline';
import { createScreenings } from '@/api';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { ScreeningsFormValues } from '@/types';
import { useMovie } from '@/hooks/useMovie';
import MovieBackButton from '@/components/movie/MovieBackButton'
import ScreeningForm from '@/components/movie/ScreeningForm';

export default function NewScreening() {
    const { movie } = useMovie()

    const { control, register, handleSubmit, formState: {errors} } = useForm<ScreeningsFormValues>({
        defaultValues: {
            screenings: [{date: '', price: 150}]
        }
    })

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createScreenings,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    
    const onSubmit: SubmitHandler<ScreeningsFormValues> = (data) => {
        const formData = {
            moviePath: movie?.path!,
            screenings: data.screenings.map((screening) => ({
                price: screening.price,
                date: new Date(screening.date).toISOString()
            }))
        }
        mutation.mutate(formData)
    }
    return (
        <div className=" bg-gray-100 h-screen">
            <div className='px-2 lg:px-0 py-5  max-w-4xl mx-auto'>
                <MovieBackButton 
                    path={`/admin/movie/${movie?.path}/screenings`} 
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
                        <ScreeningForm 
                            control={control}
                            register={register}
                            errors={errors}
                        />

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
