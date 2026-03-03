import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { login } from '@/api'
import type { UserFormType } from '@/types'

export default function LoginView() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormType>()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => navigate('/home'),
        onError: (error) => toast.error(error.message)
    })

    const onSubmit: SubmitHandler<UserFormType> = (data) => {
        mutation.mutate(data)
        reset()
    }
    return (
        <div className="w-full sm:max-w-md p-5 mx-auto">
            <h2 className="mb-12 text-center text-4xl font-extrabold">Iniciar sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input placeholder='Email' {...register('email', {required: 'El correo es obligatorio'})} id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    {errors.email && <p className='text-sm text-red-600'>{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">Password</label>
                    <input placeholder='Contraseña' {...register('password', {required: 'La contraseña es obligatoria'})} id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                    {errors.password && <p className='text-sm text-red-600'>{errors.password.message}</p>}
                </div>
                <div className="mt-6">
                    <button type={'submit'} className="w-full inline-flex items-center justify-center cursor-pointer px-4 py-2 bg-red-700 border border-transparent rounded-md font-semibold capitalize text-white  active:bg-red-600 focus:outline-none focus:border-red-600 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Iniciar sesión</button>
                </div>
                <div className="mt-6 text-center">
                    <Link to='/auth/register' className="underline">Registrate ahora</Link>
                </div>
            </form>
        </div>
    )
}
