import { useFieldArray, type Control, type FieldErrors, type UseFormRegister,  } from 'react-hook-form';
import type { ScreeningsFormValues } from '@/types';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
    register: UseFormRegister<ScreeningsFormValues>
    errors: FieldErrors<ScreeningsFormValues>
    control: Control<ScreeningsFormValues, any, ScreeningsFormValues>
}

export default function ScreeningForm({ register, errors, control}: Props) {
    const { fields, append, remove } = useFieldArray({
        name: 'screenings',
        control
    });
    const appendItem = () => {
        if(errors.screenings) return
        append({ date: '', price: 150 })
    }
    return (
        <div>
            <h4 className='font-semibold text-gray-600 mb-2'>Funciones</h4>
            <div className='flex items-start flex-wrap gap-5'>
                {fields.map((field, i) => (
                    <div key={field.id}>
                        <div className='flex gap-2 items-start'>
                            <div>
                                <label htmlFor="datetime">Horario:</label>
                                <input
                                    id='datetime'
                                    key={field.id}
                                    type={'datetime-local'}
                                    {...register(`screenings.${i}.date`, { required: 'La fecha es obligatoria' })}
                                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 block"
                                />
                                {errors?.screenings?.[i]?.date && <p className='text-red-600 text-sm'>{`${errors.screenings[i]?.date.message}`}</p>}
                            </div>
                            <div >
                                <label htmlFor="price">Precio:</label>
                                <input
                                    id='price'
                                    key={field.id}
                                    type={'number'}
                                    {...register(`screenings.${i}.price`, { required: 'El precio es obligatorio', min: {value: 0, message: 'El precio debe ser mayor a 0'} })}
                                    className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 block"
                                />
                                {errors?.screenings?.[i]?.price && <p className='text-red-600 text-sm'>{`${errors.screenings[i]?.price.message}`}</p>}
                            </div>
                            <button
                                type='button'
                                onClick={() => remove(i)}
                                className='mt-3'
                            >
                                <XMarkIcon width={20} className='text-gray-600 hover:text-red-700 transition-colors' />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => appendItem()}
                    className='py-2 px-5 rounded-lg text-gray-600 font-semibold bg-gray-50 border border-gray-300 flex items-center gap-2'
                >
                    <PlusIcon width={16} />
                    Horario
                </button>
            </div>
        </div>
    )
}
