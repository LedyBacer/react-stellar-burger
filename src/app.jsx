import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages";
import NotFound404 from "./pages/not-found/not-found";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ResetPassword from "./pages/reset-password/reset-password";
import Profile from "./pages/profile/profile";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfoRequest, refreshTokenRequest} from "./services/authSlice";
import {getCookie} from "./utils/cookie";
import {ProtectedRoute} from "./components/protected-route/protected-route";
import {Loading} from "./components/loading/loading";
import Ingredients from "./pages/ingredients/ingredients";
import ChosenIngredient from "./pages/ingredients/ingredients";
import {getIngredients} from "./services/ingredientsSlice";
import {Orders} from "./pages/orders/orders";

export default function App() {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const isLogin = useSelector(state => state.auth.isLogin)
    const ingredientLoaded = useSelector(state => state.ingredients.ingredientLoaded);
    const [initLoad, handleInitLoad] = useState(true)

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
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/login" element={<ProtectedRoute element={<Login />} />}/>
                        <Route path="/register" element={<ProtectedRoute element={<Register />} />}/>
                        <Route path="/forgot-password" element={<ProtectedRoute element={<ForgotPassword />} />}/>
                        <Route path="/reset-password" element={<ProtectedRoute element={<ResetPassword />} neededPassReset={true}/>}/>
                        <Route path="/profile" element={<ProtectedRoute element={<Profile />} forLoggedUser={true} />}/>
                        <Route path="/profile/orders" element={<ProtectedRoute element={<Orders />} forLoggedUser={true} />}/>
                        <Route path="/profile/orders/:id" element={<ProtectedRoute element={<p>wip</p>} forLoggedUser={true} />}/>
                        <Route path="/ingredients/:id" element={<ChosenIngredient />}/>
                        <Route path="*" element={<NotFound404 />} />
                    </Routes>
                </BrowserRouter>
            }
        </>
    );
};
