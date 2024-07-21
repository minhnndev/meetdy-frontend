import { ModalChangePassword, ModalUpdateProfile } from '@/components/modal';
import NavbarContainer from '@/components/organisms/pages/Dashboard/NavbarContainer/';
import { Col, Row } from '@douyinfe/semi-ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useNavigate, Routes } from 'react-router-dom';
import { setLogged } from '@/redux/slice/accountSlice';
import direct from '@/constants/direct';
import Chat from './pages/Chat';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const isLogged = useSelector((state: any) => state.account.isLogged) as boolean;

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isModalUpdateProfileVisible, setIsModalUpdateProfileVisible] = useState(false);
    const [visibleModalChangePassword, setvisibleModalChangePassword] = useState(false);
    const [codeRevoke, setCodeRevoke] = useState('');

    const { defaultEndpoint } = direct();

    const handleCancelModalUpdateProfile = (value) => {
        setIsModalUpdateProfileVisible(value);
    };

    const handleOklModalUpdateProfile = () => {
        setConfirmLoading(true);
        setConfirmLoading(false);
        setIsModalUpdateProfileVisible(false);
    };

    const handleShowModalProfile = () => {
        setIsModalUpdateProfileVisible(true);
    };

    const handleLogout = async () => {
        dispatch(setLogged(false));
    }

    const handleChangePassword = () => {
        setvisibleModalChangePassword(true);
    };

    const handleSetCodeRevoke = (code: string) => {
        setCodeRevoke(code);
        // codeRevokeRef.current = code;
    };

    useEffect(() => {
        if (!isLogged) {
            navigator(defaultEndpoint);
        }
    }, [isLogged])

    return (
        <div>
            <Row gutter={[0,0]}>
                <Col 
                    span={1}
                    xl={{ span: 1 }}
                    lg={{ span: 1 }}
                    md={{ span: 2 }}
                    sm={{ span: 3 }}
                    xs={{ span: 4 }}
                >
                    <NavbarContainer 
                        logout={handleLogout} 
                        showModalProfile={handleShowModalProfile}
                        showModalChangePassword={handleChangePassword}
                    />
                </Col>

                <Col
                    span={23}
                    xl={{ span: 23 }}
                    lg={{ span: 23 }}
                    md={{ span: 22 }}
                    sm={{ span: 21 }}
                    xs={{ span: 20 }}
                >
                    <Routes>
                        <Route   
                            path='/chat'
                            element={<Chat />}
                        />
                        {/* <Route />
                        <Route /> */}
                    </Routes>

                </Col>
            </Row>

            <ModalUpdateProfile
                isVisible={isModalUpdateProfileVisible}
                onCancel={handleCancelModalUpdateProfile}
                onOk={handleOklModalUpdateProfile}
                loading={confirmLoading}
            />

            <ModalChangePassword
                visible={visibleModalChangePassword}
                onCancel={() => setvisibleModalChangePassword(false)}
                onSaveCodeRevoke={handleSetCodeRevoke}
            />
        </div>
    );
};

export default Dashboard;
