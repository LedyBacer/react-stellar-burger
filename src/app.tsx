import React, {useEffect, useState} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import HomePage from "./pages";
import NotFound404 from "./pages/not-found/not-found";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ResetPassword from "./pages/reset-password/reset-password";
import Profile from "./pages/profile/profile";
import {getUserInfoRequest, refreshTokenRequest} from "./services/authSlice";
import {getCookie} from "./utils/cookie";
import ProtectedRoute from "./components/protected-route/protected-route";
import {Loading} from "./components/loading/loading";
import {getIngredients} from "./services/ingredientsSlice";
import {Orders} from "./pages/orders/orders";
import {HeaderRoute} from "./components/header-route/header-route";
import {IngredientsDetails} from "./pages/ingredient-details/ingredient-details";
import Modal from "./components/modal/modal";
import {useAppDispatch, useAppSelector} from "./hooks/typedHooks";
import {Feed} from "./pages/feed/feed";
import {OrderInfo} from "./components/order-info/order-info";

export default function App() {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector(state => state.auth.accessToken)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const ingredientLoaded = useAppSelector(state => state.ingredients.ingredientLoaded);
    const [initLoad, handleInitLoad] = useState(true)

    const location = useLocation();
    const background = location.state?.background

    useEffect(() => {
        dispatch(getIngredients())

        if (getCookie('refreshToken')) {
            dispatch(refreshTokenRequest());
        } else {
            handleInitLoad(false)
        }
    }, []);

    useEffect(() => {
        if (accessToken && !isLogin) {
            dispatch(getUserInfoRequest(accessToken));
        }
    }, [accessToken])

    useEffect(() => {
        if (isLogin) {
            handleInitLoad(false)
        }
    }, [isLogin])

    return (
        <>
            {initLoad || !ingredientLoaded ? <Loading /> :
                <>
                    <Routes location={background || location}>
                        <Route element={<HeaderRoute />}>
                            <Route path="/" element={<HomePage />}/>
                            <Route path="/login" element={<ProtectedRoute element={<Login />} anonymous={true}/>}/>
                            <Route path="/register" element={<ProtectedRoute element={<Register />} anonymous={true}/>}/>
                            <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPassword />} anonymous={true}/>}/>
                            <Route path="/reset-password" element={<ProtectedRoute element={<ResetPassword />} anonymous={true} neededPassReset={true}/>}/>
                            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}/>
                            <Route path="/ingredients/:id" element={<IngredientsDetails standalone={true}/>}/>

                            <Route path="/profile/orders" element={<ProtectedRoute element={<Orders />} />}/>
                            <Route path="/profile/orders/:id" element={<ProtectedRoute element={<OrderInfo standalone={true} userPage={true}/>} />}/>

                            <Route path="/feed" element={<Feed />}/>
                            <Route path="/feed/:id" element={<OrderInfo standalone={true}/>}/>

                            <Route path="*" element={<NotFound404 />} />
                        </Route>
                    </Routes>
                    {background &&
                        <Routes>
                            <Route path="/ingredients/:id" element={
                                <Modal>
                                    <IngredientsDetails />
                                </Modal>
                            }/>
                            <Route path="/feed/:id" element={
                                <Modal>
                                    <OrderInfo />
                                </Modal>
                            }/>
                            <Route path="/profile/orders/:id" element={
                                <Modal>
                                    <OrderInfo />
                                </Modal>
                            }/>
                        </Routes>
                    }
                </>
            }
        </>
    );
};
