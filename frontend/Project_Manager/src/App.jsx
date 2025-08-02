import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'

import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import ManageTask from './pages/Admin/ManageTask';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';
import Dashboard from './pages/Admin/Dashboard';

import UserDashboard from './pages/Users/UserDashboard';
import MyTask from './pages/Users/MyTask';
import ViewTaskDetails from './pages/Users/ViewTaskDetails';

import PrivateRoutes from './routes/PrivateRoutes';
import UserProvider, { UserContext } from './context/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/signUp" element={<SignUp/>} />

            {/* Admin Routes */ }
            <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<ManageTask />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/users" element={<ManageUsers />} /> 
            </Route>
            
            {/* User Routes */ }
            <Route element={<PrivateRoutes allowedRoles={['user']} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/my-tasks" element={<MyTask />} />
              <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
            </Route>

            {/* Default Route*/}
            <Route path='/' element={<Root />}/>
          </Routes>
          
          {/* Toaster component moved inside the main div */}
          <Toaster
            toastOptions={{
              className: "",
              style:{
                fontSize: '13px',
              },
            }}/>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App

const Root = () => {
  const {user, loading} = useContext(UserContext);

  if(loading) return <Outlet/>

  if(!user)
  {
    return <Navigate to="/login"/>
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />;
};