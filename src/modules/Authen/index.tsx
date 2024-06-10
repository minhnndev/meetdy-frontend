import { Spin } from '@douyinfe/semi-ui';
import { use } from 'i18next';
import React from 'react';
import { Route, Routes } from 'react-router';
import { useResolvedPath } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import "./style.css";
import { useSelector } from 'react-redux';

interface Props {}

const Authen = (props: Props) => {
    const url = useResolvedPath("").pathname;
    // console.log("🚀 ~ Authen ~ url:", url)
    const { isLoading } = useSelector((state: any) => state.account);

    
    return (
        <Spin spinning={isLoading} >
            <div id='account-page'>
                <Routes>
                    <Route path={`/`} element={<LoginPage/>} />
                    <Route path={`/registry`} element={<RegisterPage/>} />
                    <Route path={`/forgot`} element={<div>Forget Password</div>} />
                </Routes>
            </div>
        </Spin>
    )
}

export default Authen;
