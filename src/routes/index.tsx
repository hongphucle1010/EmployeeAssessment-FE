import React from 'react'
import { useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootState } from '../lib/redux/store'
import MainLayout from '../layout/MainLayout/MainLayout'
import LoginPage from '../pages/LoginPage'
import EmployeesPage from '../pages/EmployeesPage'
import CriteriaPage from '../pages/CriteriaPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import LogOut from '../pages/LogOutPage'
import TestingPage from '../pages/TestingPage/TestingPage'
import LoggedIn from '../pages/LoginPage/LoggedIn'

const Router: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.value.role)

  const userRoutes = [
    {
      path: '/login',
      element: (
        <MainLayout>
          <LoggedIn />
        </MainLayout>
      )
    },
    {
      path: '/test',
      element: (
        <MainLayout>
          <TestingPage />
        </MainLayout>
      )
    },
    {
      path: '/assessment-criteria',
      element: (
        <MainLayout>
          <CriteriaPage />
        </MainLayout>
      )
    },
    {
      path: '/logout',
      element: <LogOut />
    }
  ]
  const employeeRoutes = [
    ...userRoutes,
    {
      path: '/',
      element: (
        <MainLayout>
          <div>Home</div>
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '/employees',
      element: (
        <MainLayout>
          <EmployeesPage />
        </MainLayout>
      )
    }
  ]

  const adminRoutes = [
    ...userRoutes,
    {
      path: '/',
      element: (
        <div>
          <h1>Home</h1>
        </div>
      ),
      errorElement: <ErrorPage />
    }
  ]

  const guestRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <div>Home</div>
        </MainLayout>
      ),
      errorElement: <ErrorPage />
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
      path: '/test',
      element: (
        <MainLayout>
          <TestingPage />
        </MainLayout>
      )
    }
  ]

  const routes = role === 'USER' ? employeeRoutes : role === 'ADMIN' ? adminRoutes : guestRoutes
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default Router
