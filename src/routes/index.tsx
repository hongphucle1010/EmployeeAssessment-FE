import React from 'react'
import { useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootState } from '../lib/redux/store'
import MainLayout from '../layout/MainLayout/MainLayout'
import LoginPage from '../pages/LoginPage'
import EmployeesPage from '../pages/EmployeesPage'

const Router: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.value.role)
  const employeeRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <div>Home</div>
        </MainLayout>
      ),
      errorElement: (
        <div>
          <h1>Home Error</h1>
        </div>
      )
    }
  ]

  const supervisorRoutes = [
    {
      path: '/',
      element: (
        <div>
          <h1>Home</h1>
        </div>
      )
    },
    {
      path: '/Employees',
      element: (
        <MainLayout>
          <EmployeesPage />
        </MainLayout>
      )
    }
  ]

  const guestRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <div>Home</div>
        </MainLayout>
      )
    },
    {
      path: '/login',
      element: (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      )
    },
    {
      path: '/Employees',
      element: (
        <MainLayout>
          <EmployeesPage />
        </MainLayout>
      )
    }
  ]

  const routes = role === 'EMPLOYEE' ? employeeRoutes : role === 'SUPERVISOR' ? supervisorRoutes : guestRoutes
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default Router
