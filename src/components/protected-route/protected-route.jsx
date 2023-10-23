import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export function ProtectedRoute({ element, forLoggedUser = false, neededPassReset = false}) {
    const isUserLoaded = useSelector(state => state.auth.isLogin)
    const awaitPassReset = useSelector(state => state.auth.awaitPassReset)
    const location = useLocation();

    if (neededPassReset && !forLoggedUser) {
        return awaitPassReset ? element : <Navigate to="/forgot-password" replace/>;
    }

    if (forLoggedUser) {
        return isUserLoaded ? element : <Navigate to="/login" replace state={location.pathname}/>;
    }

    if (location.state !== null) {
       return isUserLoaded ? <Navigate to={location.state} replace/> : element;
    }

    return !isUserLoaded ? element : <Navigate to="/" replace/>;
}