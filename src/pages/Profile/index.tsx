import { useEffect, useState } from 'react'
import { Spinner, Card } from 'flowbite-react'
import { AuthenticationService } from '../../services/authentication'
import { GetMePayload } from '../../api/authentication/types'

const Profile = () => {
  const [user, setUser] = useState<GetMePayload | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await AuthenticationService.getMe()
        setUser(response.data)
      } catch (error) {
        console.error('Failed to fetch user profile', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-red-500'>Failed to load user profile.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>Profile</h1>
      <Card className='w-full max-w-md shadow-lg'>
        <div className='flex flex-col gap-4'>
          <p className='text-lg'>
            <strong className='text-gray-700'>ID:</strong> {user.id}
          </p>
          <p className='text-lg'>
            <strong className='text-gray-700'>Username:</strong> {user.username}
          </p>
          <p className='text-lg'>
            <strong className='text-gray-700'>Role:</strong> {user.role}
          </p>
          <p className='text-lg'>
            <strong className='text-gray-700'>Supervisor ID:</strong> {user.supervisor}
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Profile
