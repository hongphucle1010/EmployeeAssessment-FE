import React from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutProps } from '../../lib/types/layout'
import Navigation from '../../components/navigation/Navigation'
// import Header from '../../components/Header/Header.tsx'
// import styles from './MainLayout.module.scss' // Import the CSS module

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <div className={`h-screen w-full flex flex-col overflow-hidden relative`}>
    <div className={`h-screen w-full flex overflow-hidden relative`}>
      <div className='flex-1 overflow-auto p-0 m-0 flex flex-col h-full'>
        <Navigation />
        <div
          className='flex-1'
          //   style={{
          //     height: 'calc(100% - 4rem)'
          //   }}
        >
          {children}
        </div>
      </div>
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
