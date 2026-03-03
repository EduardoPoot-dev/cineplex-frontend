import { Link } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { CreateUserFormType } from '@/types'
import { createNewUser } from '@/api'

export default function RegisterView() {
    const { register,  watch, handleSubmit, reset, formState: { errors } } = useForm<CreateUserFormType>()
    const password = watch('password')

    const mutation = useMutation({
        mutationFn: createNewUser,
        onSuccess: (message) => toast.success(message),
        onError: (error) => toast.error(error.message)
    })

    const onSubmit: SubmitHandler<CreateUserFormType> = (data) => {
        mutation.mutate(data)
        reset()
    }

    return (
        <div className="w-full sm:max-w-md p-5 mx-auto">
            <h2 className="mb-12 text-center text-4xl font-extrabold">Crear cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="name">Name</label>
                    <input {...register("name", { required: 'El nombre es obligatorio'} )} id="name" type="text" name="name" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    {errors.name && <p className='text-sm text-red-600'>{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input {...register("email", { required: 'El email es obligatorio' })} id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input {...register("password", { required: 'La contraseña es obligatoria', minLength: {value: 8, message: 'La conntraseña debe tener 8 minimo caracteres '} })} id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="confirmPassword">Confirmar Password</label>
                    <input {...register("confirmPassword", { required: 'Este campo es obligatorio', validate: (value) => value === password || 'Los passwords no coinciden'})} id="confirmPassword" type="password" name="confirmPassword" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    {errors.confirmPassword && <p className='text-sm text-red-600'>{errors.confirmPassword.message}</p>}
                </div>
                <div className="mt-6">
                    <button type={'submit'} className="w-full inline-flex items-center justify-center cursor-pointer px-4 py-2 bg-red-700 border border-transparent rounded-md font-semibold capitalize text-white  active:bg-red-600 focus:outline-none focus:border-red-600 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Registrarse</button>
                </div>
                <div className="mt-6 text-center">
                    <Link to='/auth/login' className="underline">¿Ya tienes una cuenta? Inicia sesión</Link>
                </div>
            </form>
        </div>
    )
}
