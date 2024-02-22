import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';





function App() {
  useEffect(()=>{
    // Check if token exists in local storage and update user data if so
    if(localStorage.getItem('token')){
      saveUserData()
    }
   },[])
  let [userData,setUserData]=useState(null)
  function saveUserData() {
    // Decode token from local storage and set user data state
    const encodeToken=localStorage.getItem('token')
    const decodeToken=jwtDecode(encodeToken)
    setUserData(decodeToken)
  }
  let routes=createBrowserRouter([
    {path:"",element:<Layout userData={userData} setUserData={setUserData}></Layout>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path: 'register', element:<Register/>},
      {path: 'login', element:<Login saveUserData={saveUserData}/>},
      {path:'*',element:<NotFound/>},

      

    ]}
  ])
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
