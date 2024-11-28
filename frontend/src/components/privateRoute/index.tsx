import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const authToken = localStorage.getItem('authToken');
    return authToken ? children : <Navigate to="/" />;
}

export default PrivateRoute;
