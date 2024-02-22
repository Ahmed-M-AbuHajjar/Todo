import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute(props) {
    if(localStorage.getItem('token')==null){
        return <Navigate to={'login'}/>
    } else {
    return props.children;
    }
}

