import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

export default function ProtectedRoute({ element, anonymous = false, neededPassReset = false }) {
    const isLoggedIn = useSelector((store) => store.auth.isLogin);
    const location = useLocation();
    const from = location.state?.from.pathname || '/';
    // const awaitPassReset = useSelector(state => state.auth.awaitPassReset)
    // console.log(from.pathname, location.state?.from.pathname)

    if (anonymous && isLoggedIn) {
        return <Navigate to={ from } />;
    }

    // if (anonymous && !isLoggedIn && neededPassReset && !awaitPassReset) {
    //     return <Navigate to="/forgot-password" replace/>;
    // }

    if (anonymous && !isLoggedIn && neededPassReset && !(from === '/forgot-password')) {
        return <Navigate to="/forgot-password" replace/>;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return element;
}
