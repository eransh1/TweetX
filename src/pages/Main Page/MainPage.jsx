import React from 'react'
import DashboardNavbar from '../../components/Dashboard Navbar/DashboardNavbar'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <>
    <DashboardNavbar/>
    <Outlet/>
    </>
  )
}

export default MainPage