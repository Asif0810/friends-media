import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../share/loader/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const location = useLocation()
    if (loader) {
        return <Loader></Loader>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;