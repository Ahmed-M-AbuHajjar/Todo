import React from "react";
import Navbar from '../NavBar/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';


export default function Layout({ userData, setUserData }) {
    const navigate = useNavigate();

    // Function to handle user logout
    const logOut = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // Set userData to null
        setUserData(null);
        // Navigate to login page
        navigate('/login')
    }

    return (
        <>
            <Navbar userData={userData} logOut={logOut}></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
        </>
    )
}
