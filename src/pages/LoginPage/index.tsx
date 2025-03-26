import { ToastContainer } from 'react-toastify'
import LoginForm from '../../components/login'

const LoginPage = () => {
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <ToastContainer />
      <LoginForm />
    </div>
  )
}

export default LoginPage
