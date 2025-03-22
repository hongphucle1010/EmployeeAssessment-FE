import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'

const Navigation = () => {
  const role = useSelector((state: RootState) => state.user.value.role)
  console.log(role)
  //const role = 'employee'
  const Nav_employee_links = (
    <>
      <div className='flex flex-1 items-center space-x-[5vw] ml-[5vw]'>
        <Link to='/Profile' className='hover:text-ggray-300 transition'>
          Profile
        </Link>
        <Link to='/Assessment' className='hover:text-gray-300 transition'>
          Assessment
        </Link>
        <Link to='/Feedback' className='hover:text-gray-300 transition'>
          Feedback
        </Link>
      </div>
    </>
  )
  const Nav_supervisor_links = (
    <>
      <div className='flex flex-1 items-center space-x-[5vw] ml-[5vw]'>
        <Link to='/Profile' className='hover:text-gray-300 transition'>
          Profile
        </Link>
        <Link to='/Employee' className='hover:text-gray-300 transition'>
          Employee
        </Link>
        <Link to='/Assessment' className='hover:text-gray-300 transition'>
          Assessment
        </Link>
      </div>
    </>
  )
  const Nav_guest = (
    <>
      <div className='flex flex-1 items-center space-x-[5vw] ml-[5vw]'>
        <Link to='/A' className='hover:text-gray-300 transition'>
          No access
        </Link>
        <Link to='/B' className='hover:text-gray-300 transition'>
          No access
        </Link>
        <Link to='/C' className='hover:text-gray-300 transition'>
          No access
        </Link>
      </div>
    </>
  )
  const Navigation_container = (
    <>
      <header className='w-full h-[10vh] flex items-center justify-between h-[10vh] px-[5vw] py-[3vh] bg-blue-400 text-white sticky top-0 left-0 z-50'>
        <div className='flex flex-1 items-center'>
          <div className='mr-[2vw]'>
            <Link to='/HomePage' className='text-lg font-bold'>
              404BNT
            </Link>
          </div>
          <>
            {role === 'EMPLOYEE' && Nav_employee_links}
            {role === 'SUPERVISOR' && Nav_supervisor_links}
            {role === 'GUEST' && Nav_guest}
          </>
        </div>
        <div>
          <Link
            to='/Login'
            className='bg-white text-blue-600 px-[1vw] py-[1vh] rounded-md hover:bg-gray-200 transition'
          >
            Login
          </Link>
        </div>
      </header>
    </>
  )
  return <>{Navigation_container}</>
}

export default Navigation
