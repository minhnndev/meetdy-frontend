import { Spin } from '@douyinfe/semi-ui';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import "./style.css";
import { useSelector } from 'react-redux';
import ForgotPassword from './pages/ForgotPassword';
import { getLoading } from '@/redux/slice/accountSlice';

const Authen = () => {
    const isLoading = useSelector((state: any) => getLoading(state));

    return (
        <Spin spinning={isLoading} >
            <div id='account-page'>
                <Routes>
                    <Route path={`/login`} element={<LoginPage/>} />
                    <Route path={`/registry`} element={<RegisterPage/>} />
                    <Route path={`/forgot`} element={<ForgotPassword/>} />
                </Routes>
            </div>
        </Spin>
    )
}

export default Authen;
