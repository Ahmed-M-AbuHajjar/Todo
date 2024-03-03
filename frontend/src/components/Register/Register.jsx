import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    // Initializing form with useForm hook
    const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm();
    const navigate = useNavigate();

    // Mutation for registering user
    const registerMutation = useMutation(data => axios.post('https://todolist-backend-m85o.onrender.com/api/v1/user/signup', data),{
        onSuccess: (data) => {
            console.log(data);
            toast.success('Registration successful')
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        },
        onError: (error) => {
            console.error(error);
            toast.error('Registration failed!')
        }
    });

    // Form submission handler
    const onSubmit = (data) => {
        registerMutation.mutate(data);
    }
    return(
        <>
        <div className="min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true, pattern: /^[a-zA-Z\s]+$/ })} type="text" onBlur={() => trigger("name")} placeholder="Name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-200" />
                    {errors.name && <span className="text-red-500">Name is required and should only contain letters</span>}
                    
                    <input {...register("email", { required: true, pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/ })} type="email" onBlur={() => trigger("email")} placeholder="Email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1 bg-gray-200" />
                    {errors.email && <span className="text-red-500">Email is required and should be a valid email address</span>}
                    
                    <input {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/ })} type="password" onBlur={() => trigger("password")} placeholder="Password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1 bg-gray-200" />
                    {errors.password && <span className="text-red-500">Password must be at least 8 characters long and contain at least one number, one special character, and one letter.</span>}
                    
                    <input {...register("cPassword", { required: true, validate: (value) => value === getValues('password') || "Passwords do not match." })} type="password" onBlur={() => trigger("cPassword")} placeholder="Confirm Password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-1 bg-gray-200" />
                    {errors.cPassword && <span className="text-red-500">{errors.cPassword.message}</span>}
                    
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
                </form>
                <div className="text-center text-sm">
            <span className="text-gray-400">Already registered? </span>
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Login</Link>
          </div>
            </div>
        </div>
        <ToastContainer/>
    </>
    )
}

