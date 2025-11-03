import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../component/reuseble-component/Navbar'

export default function RootLayout() {
  return (
    <div className='container mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  )
}
