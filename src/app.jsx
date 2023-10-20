import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages";
import NotFound404 from "./pages/not-found/not-found";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ResetPassword from "./pages/reset-password/reset-password";
import Profile from "./pages/profile/profile";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/reset-password" element={<ResetPassword />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/ingredients/:id" element={<></>}/>
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </BrowserRouter>
    );
};
