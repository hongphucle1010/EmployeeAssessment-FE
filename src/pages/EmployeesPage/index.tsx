import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SuperviseeService } from '../../services/supervisee';
import { Employee } from '../../api/supervisee/types';
import { GetMePayload } from '../../api/authentication/types';

const EmployeeCard = ({ employee }: { employee: Employee }) => {
  return (
    <Link to={`/assessment/${employee.id}`} className="block">
      <div className="p-4 border rounded-md hover:shadow-lg cursor-pointer h-[85px] bg-[#c3ddfd]">
        <h2 className="font-semibold text-lg">{employee.name}</h2>
        <p className="text-sm text-gray-500">{employee.role}</p>
      </div>
    </Link>
  );
};

const EmployeePage = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'role'>('name');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await SuperviseeService.getAllSupervisee();
        console.log('Employees fetched', response);
        // Xử lý toàn bộ data và set state một lần:
        const newEmployeeList = response.data.map((data: GetMePayload) => ({
          id: data.id,
          name: data.username,
          role: data.role,
          supervisor: data.supervisor,
        }));
        setEmployeeList(newEmployeeList);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    };

    fetchEmployees();
  }, []);

  const sortedEmployeeList = [...employeeList].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      // Ví dụ: Sắp xếp theo role, ưu tiên 'ADMIN' đứng sau các role khác
      const roleCompare = (roleA: string, roleB: string, nameA: string, nameB: string) => {
        if (roleA === roleB) return nameA > nameB ? 1: -1;
        if (roleA === 'ADMIN') return -1;
        if (roleA === 'USER') return -1;
        return 1;
      };
      return roleCompare(a.role, b.role, a.name, b.name);
    }
  });

  return (
    <div className="flex flex-col items-start gap-4 text-black p-5">
      <h1 className="text-2xl font-semibold">Employee List</h1>

      {/* Dropdown chọn tiêu chí sắp xếp */}
      <div className="mb-4">
        <label htmlFor="sortBy" className="mr-2 font-medium">
          Sắp xếp theo:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'role')}
          className="p-2 border rounded-md"
        >
          <option value="name">Name</option>
          <option value="role">Role</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {sortedEmployeeList.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeePage;
