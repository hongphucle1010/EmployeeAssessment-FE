import { useEffect, useState } from 'react'
import { GetMePayload } from '../../api/authentication/types'
import { SuperviseeService } from '../../services/supervisee'

// *TODO 

const EmployeesPage = () => {
  const [employeeList, setEmployeeList] = useState<GetMePayload[]>([])

  useEffect(() => {
    SuperviseeService.getAllSupervisee().then((response) => {
      console.log('response', response)
      setEmployeeList(response.data)
    })
  }, [])

  return (
    <div className='flex flex-col items-start gap-4 text-black p-5'>
      <span className='font-semibold text-2xl'>Employee List</span>
      <div>
        {employeeList.map((employee) => (
          <div>
            <span>Employee: </span>
            <span>{employee.username}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeesPage
