import { Spin } from '@douyinfe/semi-ui';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import "./style.css";
import { useSelector } from 'react-redux';

const Authen = () => {
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
