import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from 'react-redux'


const RequireAuth = () => {
  const token = useSelector(state => state.auth.token)
  const location = useLocation()

  const redirectTo = location.pathname

  if (!token) {
    return <Navigate to={`login?redirectTo=${redirectTo}`}/>
  }
  return <Outlet/>
};

export {RequireAuth};