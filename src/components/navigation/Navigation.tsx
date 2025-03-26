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
        <Link to='/profile' className='hover:text-ggray-300 transition'>
          My Profile
        </Link>
        <Link to='/assessment' className='hover:text-gray-300 transition'>
          Assessment
        </Link>
        <Link to='/employee' className='hover:text-gray-300 transition'>
          Employee
        </Link>
        <Link to='/assessment-criteria' className='hover:text-gray-300 transition'>
          Assessment Criteria
        </Link>
        <Link to='/feedback' className='hover:text-gray-300 transition'>
          Feedback
        </Link>
      </div>
    </>
  )
  const Nav_hr_links = (
    <>
      <div className='flex flex-1 items-center space-x-[5vw] ml-[5vw]'>
        <Link to='/profile' className='hover:text-gray-300 transition'>
          Profile
        </Link>
        <Link to='/employee' className='hover:text-gray-300 transition'>
          Employee
        </Link>
        <Link to='/assessment' className='hover:text-gray-300 transition'>
          Assessment
        </Link>
      </div>
    </>
  )
  const Nav_guest = (
    <>
      <div className='flex flex-1 items-center space-x-[5vw] ml-[5vw]'>
        <Link to='/profile' className='hover:text-ggray-300 transition'>
          My Profile
        </Link>
        <Link to='/assessment' className='hover:text-gray-300 transition'>
          Assessment
        </Link>
        <Link to='/employee' className='hover:text-gray-300 transition'>
          Employee
        </Link>
        <Link to='/assessment-criteria' className='hover:text-gray-300 transition'>
          Assessment Criteria
        </Link>
        <Link to='/feedback' className='hover:text-gray-300 transition'>
          Feedback
        </Link>
      </div>
    </>
  )
  const Navigation_container = (
    <>
      <header className='w-full h-[10vh] flex items-center justify-between px-[5vw] py-[3vh] bg-blue-400 text-white sticky top-0 left-0 z-50'>
        <div className='flex flex-1 items-center'>
          <div className='mr-[2vw]'>
            <Link to='/' className='text-lg font-bold'>
              404BNT
            </Link>
          </div>
          <>
            {role === 'USER' && Nav_employee_links}
            {role === 'ADMIN' && Nav_hr_links}
            {role === 'GUEST' && Nav_guest}
          </>
        </div>
        <div>
          {role === 'GUEST' ? (
            <Link
              to='/login'
              className='bg-white text-blue-600 px-[1vw] py-[1vh] rounded-md hover:bg-gray-200 transition'
            >
              Login
            </Link>
          ) : (
            <Link
              to='/logout'
              className='bg-white text-blue-600 px-[1vw] py-[1vh] rounded-md hover:bg-gray-200 transition'
            >
              Logout
            </Link>
          )}
        </div>
      </header>
    </>
  )
  return <>{Navigation_container}</>
}

export default Navigation
