import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoggedIn: React.FC = () => {
  const navigate = useNavigate()
  const [timer, setTimer] = useState(5)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => {
      clearInterval(countdown)
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold text-blue-600'>Welcome Back!</h1>
      <p className='mt-4 text-lg text-gray-700'>You are successfully logged in.</p>
      <p className='mt-2 text-gray-500'>Redirecting to Home in {timer} seconds...</p>
    </div>
  )
}

export default LoggedIn
