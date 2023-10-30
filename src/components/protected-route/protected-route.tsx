import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "../../hooks/typedHooks";
import {ReactElement} from "react";

type TProtectedRoute = {
    element: ReactElement,
    anonymous?: boolean,
    neededPassReset?: boolean
}

export default function ProtectedRoute({ element, anonymous = false, neededPassReset = false }: TProtectedRoute) {
    const isLoggedIn = useAppSelector((store) => store.auth.isLogin);
    const location = useLocation();
    const from = location.state?.from.pathname || '/';

    if (anonymous && isLoggedIn) {
        return <Navigate to={ from } />;
    }

    if (anonymous && !isLoggedIn && neededPassReset && !(from === '/forgot-password')) {
        return <Navigate to="/forgot-password" replace/>;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return element;
}
