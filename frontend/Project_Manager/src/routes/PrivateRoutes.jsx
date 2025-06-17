import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoutes = ({allowedRoles}) => {
  return <Outlet/>
    // This component can be used to wrap routes that require authentication
}

export default PrivateRoutes