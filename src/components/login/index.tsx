import { Link } from 'react-router-dom';

import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

interface ILoginForm {
    email: string,
    password: string,
}

const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .matches(/^(?! )[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Z])/, 'Password must include at least one uppercase letter')
        .matches(/^(?=.*[0-9])/, 'Password must include at least one digit')
        .matches(/^(?=.*[@$!%?&#^()])/, 'Password must include at least one special character'),
})

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ILoginForm>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        try {
            
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <form className='text-start w-full max-w-[960px] px-8 py-12 rounded-md bg-grey shadow-sm bg-gray-100' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <div className='w-full'>
                    <label className='font-semibold text-sm' htmlFor='LoginEmail'>Email: </label>
                    <input
                        id='LoginEmail'
                        type='email'
                        className='w-full p-2 mt-1 border border-gray-300 rounded-md'
                        placeholder='yourname@email.com'
                        {...register('email')}
                    />
                </div>
                <div className='w-full'>
                    <label className='font-semibold text-sm' htmlFor='LoginPassword'>Password: </label>
                    <input
                        id='LoginPassword'
                        type='password'
                        className='w-full p-2 mt-1 border border-gray-300 rounded-md'
                        placeholder='********'
                        {...register('password')}
                    />
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                <div className="flex items-center">
                        <input
                            id="RememberMe"
                            type="checkbox"
                            className="mr-2 rounded"
                        />
                        <label className="font-medium text-sm" htmlFor="RememberMe">
                            Remember me
                        </label>
                    </div>
                    <p className="font-medium text-sm text-blue-500 hover:underline">
                        <Link to={'/auth/forgot-password'}>
                            Forgot password?
                        </Link>
                    </p>
                </div>
                <button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full p-2 rounded-lg text-base font-semibold text-white bg-blue-600 disabled:bg-grey hover:bg-opacity-80'
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    )
}

export default LoginForm;