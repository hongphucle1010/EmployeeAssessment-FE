import { useEffect, useState } from 'react'
import { GetMePayload } from '../../api/authentication/types'
import { AuthenticationService } from '../../services/authentication'
import { useNavigate } from 'react-router-dom'

const CardItem = [
  {
    title: 'Profile',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    link: '/profile',
    content: 'View and edit your personal profile'
  },
  {
    title: 'Assessment',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    link: '/assessment',
    content: 'Check out the assessments given by your supervisors'
  },
  {
    title: 'Criteria',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    link: '/assessment-criteria',
    content: 'Manage the criteria used for making assessments'
  },
  {
    title: 'Employees',
    bgColor: 'bg-rose-50',
    borderColor: 'border-red-300',
    link: '/employee',
    content: 'View and manage all of your employees'
  }
]

type CardItemProps = {
  title: string
  bgColor: string
  borderColor: string
  link: string
  content: string
}
const HomePageCard = ({ title, bgColor, borderColor, link, content }: CardItemProps) => {
  const router = useNavigate()
  return (
    <div
      className={`w-full min-h-64 p-5 rounded-xl border ${borderColor} ${bgColor} hover:cursor-pointer flex flex-col justify-between gap-2`}
      onClick={() => {
        router(link)
      }}
    >
      <div className='flex flex-col items-start gap-2 mt-2'>
        <span className='text-xl font-semibold'>{title}</span>
        <span className='text-base font-normal'>{content}</span>
      </div>
      <span className='text-sm font-thin hover:underline w-full text-right'>Click to view</span>
    </div>
  )
}

const HomePage = () => {
  const [user, setUser] = useState<GetMePayload | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await AuthenticationService.getMe()
        setUser(res.data.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div role='status' className='flex flex-col gap-4 p-5 text-center w-full items-center'>
        <svg
          aria-hidden='true'
          className='inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
        <span className='sr-only'>Loading...</span>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 p-5'>
      <span className='font-semibold text-2xl'>
        {user ? `Welcome to 404BrainNotFound, ${user.username}!` : 'Welcome to 404BrainNotFound!'}
      </span>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {CardItem.map((item) => (
          <HomePageCard
            key={item.title}
            title={item.title}
            bgColor={item.bgColor}
            borderColor={item.borderColor}
            link={item.link}
            content={item.content}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage
