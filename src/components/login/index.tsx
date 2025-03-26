import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { logInApi } from '../../api/login'
import { useState } from 'react'
import { setAccessToken } from '../../lib/helper/authentication'

interface ILoginForm {
  username: string
  password: string
}

const LoginSchema = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  password: yup.string().trim().required('Password is required')
})

const LoginForm = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setErrorMessage(null) // Reset lỗi trước khi gửi request

    try {
      console.log('Submitting:', data)
      const response = await logInApi(data)
      setAccessToken(response.token)
      console.log('Response:', response)
      alert('Login successful')
      return response
    } catch (error) {
      console.error('Error during login:', error)
      setErrorMessage('Login failed: Invalid credentials or server error')
    }
  }

  return (
    <form
      className='text-start w-full max-w-[960px] px-8 py-12 rounded-md bg-grey shadow-sm bg-gray-100'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-4 items-center justify-center'>
        {/* Hiển thị thông báo lỗi */}
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

        <div className='w-full'>
          <label className='font-semibold text-sm' htmlFor='LoginUsername'>
            Username:
          </label>
          <input
            id='LoginUsername'
            type='text'
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            placeholder='yourusername'
            {...register('username')}
          />
          {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
        </div>

        <div className='w-full'>
          <label className='font-semibold text-sm' htmlFor='LoginPassword'>
            Password:
          </label>
          <input
            id='LoginPassword'
            type='password'
            className='w-full p-2 mt-1 border border-gray-300 rounded-md'
            placeholder='********'
            {...register('password')}
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>

        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex items-center'>
            <input id='RememberMe' type='checkbox' className='mr-2 rounded' />
            <label className='font-medium text-sm' htmlFor='RememberMe'>
              Remember me
            </label>
          </div>
          <p className='font-medium text-sm text-blue-500 hover:underline'>
            <Link to={'/auth/forgot-password'}>Forgot password?</Link>
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

export default LoginForm
