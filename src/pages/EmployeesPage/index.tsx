import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SuperviseeService } from '../../services/supervisee';
import { Employee } from '../../api/supervisee/types';
import { GetMePayload } from '../../api/authentication/types';


/*
export interface Employee {
  id: number
  name: string
  role: string
  supervisor: number
}
*/

const EmployeeCard = ({ employee }: { employee: Employee }) => {
  return (
    <Link to={`/assessment/${employee.id}`} className="block">
      <div className="p-4 border rounded-md hover:shadow-lg cursor-pointer">
        <h2 className="font-semibold text-lg">{employee.name}</h2>
        <p className="text-sm text-gray-500">{employee.role}</p>
      </div>
    </Link>
  );
};

const EmployeePage = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await SuperviseeService.getAllSupervisee();
        console.log('Employees fetched', response);
        response.data.forEach((data: GetMePayload) => {
          const employee: Employee = {
            id: data.id,
            name: data.username,
            role: data.role,
            supervisor: data.supervisor
          }
          setEmployeeList((prev) => [...prev, employee])
        })
      } catch (error) {
        console.error('Failed to fetch employees', error)
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="flex flex-col items-start gap-4 text-black p-5">
      <h1 className="text-2xl font-semibold">Danh sách Nhân viên</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {employeeList.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeePage;
