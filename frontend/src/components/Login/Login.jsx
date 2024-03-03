import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';


export default function Login({saveUserData }) {
    // Initialize form with useForm hook
    const { register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();

    // Mutation for user login
    const loginMutation = useMutation(data => axios.post('https://todolist-backend-m85o.onrender.com/api/v1/user/signin', data), {
        onSuccess: (data) => {
            // Save token to local storage and call saveUserData function
            localStorage.setItem('token', data.data.token);
            saveUserData();
            // Redirect user to home page after successful login
            navigate('/');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Login failed!')
        }
    });
    // Form submission handler
    const onSubmit = (data) => {
        loginMutation.mutate(data);
    }
    
    return(
        <>
            <div className="min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Login to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>   
                        
                        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder="Email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1 bg-gray-200" />
                        {errors && errors.email && <span className="text-red-500">Email is required</span>}
                        
                        <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1 bg-gray-200" />
                        {errors && errors.password && <span className="text-red-500">Password is required</span>}
                        
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                    </form>
                    <div className="text-center text-sm">
            <span className="text-gray-400">Not registered? </span>
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300">Register</Link>
          </div>
                </div>
            </div>
        <ToastContainer/>
    </>
    )
}

