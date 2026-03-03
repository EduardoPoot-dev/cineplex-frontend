import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { FilmIcon } from "@heroicons/react/16/solid";
import { getCategories, uploadPosterImage } from '@/api';
import type { MovieFormValues } from '@/types'
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { formatImageScr } from '@/utils';

interface Props {
    register: UseFormRegister<MovieFormValues>
    errors: FieldErrors<MovieFormValues>
    watch: UseFormWatch<MovieFormValues>
    setValue: UseFormSetValue<MovieFormValues>
}

export default function MovieForm({ register, errors, watch, setValue }: Props) {
    const posterImage = watch('image')

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    })

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])
        const image = await uploadPosterImage(formData)
        setValue('image', image)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1
    })

    if(data) return (
        <div>
            <div className="bg-white rounded-lg p-10 border border-gray-300 mb-5">
                <div className="mb-5">
                    <h3 className="text-2xl font-semibold leading-2">
                        <FilmIcon width={32} className="inline-block  text-red-700 mr-2" />
                        Información básica
                    </h3>
                    <span className="text-gray-600">Datos principales de la película</span>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-6 gap-5 '>
                    <div className="lg:col-span-2">
                        <label className="block mb-1 font-semibold" htmlFor="name">Nombre</label>
                        <input {...register('name', { required: 'El nombre es obligatorio' })} placeholder='Ej. Horizonte final' id="name" type="text" name="name" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        {errors.name && <p className='text-sm text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className="lg:col-span-3">
                        <label className="block mb-1 font-semibold" htmlFor="path">Path</label>
                        <input {...register('path', { required: 'El path es obligatorio' })} placeholder='Ej. horizonte-final' id="path" type="text" name="path" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        {errors.path && <p className='text-sm text-red-600'>{errors.path.message}</p>}
                    </div>
                    <div className="lg:col-span-1">
                        <label className="block mb-1 font-semibold" htmlFor="calification">Calificación</label>
                        <input {...register('rate', { required: 'La calificación de la película es obligatorio' })} placeholder='Ej. 10' id="calification" type="number" name="rate" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        {errors.rate && <p className='text-sm text-red-600'>{errors.rate.message}</p>}
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block mb-1 font-semibold" htmlFor="premiere">Fecha de estreno</label>
                        <input
                            {...register('premiereDate', { valueAsDate: true, required: 'La fecha de estreno es obligatorio' })}
                            placeholder='Ej. 2026'
                            type="date"
                            name="premiereDate"
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.premiereDate && <p className='text-sm text-red-600'>{errors.premiereDate.message}</p>}
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block mb-1 font-semibold" htmlFor="hoursDuration">Horas de duración</label>
                        <input {...register('hoursDuration', { required: 'Las horas de duración de la película es obligatorio' })} placeholder='Ej. 1' id="hoursDuration" type="number" name="hoursDuration" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        {errors.hoursDuration && <p className='text-sm text-red-600'>{errors.hoursDuration.message}</p>}
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block mb-1 font-semibold" htmlFor="minutesDuration">Minutos de duración</label>
                        <input {...register('minutesDuration', { required: 'Los minutos de duración de la película es obligatorio' })} placeholder='Ej. 40' id="minutesDuration" type="number" name="minutesDuration" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        {errors.minutesDuration && <p className='text-sm text-red-600'>{errors.minutesDuration.message}</p>}
                    </div>
                    <div className="lg:col-span-3">
                        <label className="block mb-1 font-semibold" htmlFor="category">Categoria</label>
                        <select
                            {...register('category_id', { required: 'La categoria es obligatoria' })}
                            id="category"
                            name="category_id"
                            className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        >
                            <option value=''>Seleccione</option>
                            {data.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className='text-sm text-red-600'>{errors.category_id.message}</p>}
                    </div>
                    <div className="lg:col-span-3">
                        <label className="block mb-1 font-semibold" htmlFor="director">Nombre del director</label>
                        <input {...register('director', { required: 'El nombre del director es obligatorio' })} placeholder='Ej. Eduardo' id="director" type="text" name="director" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        {errors.director && <p className='text-sm text-red-600'>{errors.director.message}</p>}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-10 border border-gray-300 mb-5">
                <div className="mb-5">
                    <h3 className="text-2xl font-semibold">
                        Sinopsis
                    </h3>
                    <span className="text-gray-600 mt-5">Descripción de la película</span>
                </div>

                <div>
                    <textarea {...register('description', { required: 'La sinopsis de la película es obligatoria' })} placeholder="Añade la descripción" rows={5} className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full">
                    </textarea>
                    {errors.description && <p className='text-sm text-red-600'>{errors.description.message}</p>}

                </div>
            </div>

            <div className="bg-white rounded-lg p-10 border border-gray-300 mb-5">
                <div className="mb-5">
                    <h3 className="text-2xl font-semibold">
                        Poster de la película
                    </h3>
                    <span className="text-gray-600 mt-5">Sube la imagen del poster</span>
                </div>

                <div  {...getRootProps()} className='border cursor-pointer border-dashed border-gray-500 p-10'>
                    <input {...register('image', { required: 'El poster de la película es obligatoria' })} {...getInputProps()} />
                    <p className='text-center text-gray-600'>Drag 'n' drop some files here, or click to select files</p>
                </div>
                {!posterImage && <p className='text-sm text-red-600'>{errors.image?.message}</p>}

                {posterImage && (
                    <div className='mt-5 space-y-5'>
                        <h3 className='font-semibold'>Poster:</h3>
                        <img
                            src={formatImageScr(posterImage)}
                            alt='Poster de la nueva película'
                            className='w-50'
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
