import { ModalUpdateProfile } from '@/components/modal';
import NavbarContainer from '@/components/organisms/pages/Dashboard/NavbarContainer/';
import { removeProfile } from '@/redux/slice/globalSlice';
import { Col, Row } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import storeHelper from "@/utils/storeHelper";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isModalUpdateProfileVisible, setIsModalUpdateProfileVisible] = useState(false);
    // const [visibleModalChangePassword, setvisibleModalChangePassword] = useState(false);

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

    const handleLogout = () => {
        dispatch(removeProfile());
        storeHelper.removeStoreToken();
        navigator("/auth/login");  
    }

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
                    // style={{background: 'black'}}
                >
                    <NavbarContainer 
                        logout={handleLogout} 
                        showModalProfile={handleShowModalProfile} 
                    />
                </Col>
            </Row>

            <ModalUpdateProfile
                isVisible={isModalUpdateProfileVisible}
                onCancel={handleCancelModalUpdateProfile}
                onOk={handleOklModalUpdateProfile}
                loading={confirmLoading}
            />

            {/* <ModalChangePassword
                visible={visibleModalChangePassword}
                onCancel={() => setvisibleModalChangePassword(false)}
                onSaveCodeRevoke={onSaveCodeRevoke}
            /> */}
        </div>
    );
};

export default Dashboard;
