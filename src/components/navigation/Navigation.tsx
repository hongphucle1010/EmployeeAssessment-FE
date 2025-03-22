import { Link, Outlet } from 'react-router-dom'

const Navigation = () => {
  return (
    <>
      <header className='w-full flex items-center justify-between px-[5vw] py-[3vh] bg-blue-600 text-white sticky top-0 left-0 z-50'>
        <div className='flex flex-1 items-center'>
          <div className='mr-[2vw]'>
            <Link to='/HomePage' className='text-lg font-bold'>
              404BNT
            </Link>
          </div>
          <div className='flex flex-1 items-center space-x-[5vw] ml-[5vw]'>
            <Link to='/Employees' className='hover:text-gray-300 transition'>
              Employees
            </Link>
            <Link to='/criteria' className='hover:text-gray-300 transition'>
              Criteria
            </Link>
            <Link to='/Temp3' className='hover:text-gray-300 transition'>
              Temp3
            </Link>
          </div>
        </div>
        {/* Nav 2: Login Button */}
        <div>
          <Link
            to='/Login'
            className='bg-white text-blue-600 px-[1vw] py-[1vh] rounded-md hover:bg-gray-200 transition'
          >
            Login
          </Link>
        </div>
      </header>

      {/* Thêm khoảng trống phía trên nội dung để không bị che bởi header cố định
      <main>
        <Outlet />
      </main> */}
    </>
  )
}

export default Navigation
