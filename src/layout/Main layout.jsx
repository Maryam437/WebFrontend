import React from 'react'
import Dashbord from '../Component/Dashboard'
import { Outlet } from 'react-router-dom'

function Mainlayout() {
  return (
    <div>
        <Dashbord/>
        <Outlet/>
    </div>
  )
}

export default Mainlayout