import { IcHelper } from "@/theme/icons/MDIcons"
import { Form, Input, Notification, Modal, Tooltip } from '@douyinfe/semi-ui';
import meApi from '@/api/meApi';
import { useState } from 'react';
import generateCode from '@/utils/generateCode';
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { ResponseToken } from '@/redux/slice/accountSlice';
import lang from '@/i18n';
import './style.css'

interface ModalChangePasswordProps {
    visible: boolean;
    onCancel?: () => void;
    onSaveCodeRevoke?: (code: string) => void;
}

const ModalChangePassword = (props: ModalChangePasswordProps) => {
    const { visible, onSaveCodeRevoke, onCancel } = props
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [ isVerifyForm, setVerifyForm ] = useState(false);    
    const { confirm } = Modal;
    const {t} = lang();

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        // form.validateFields()
        //     .then(async ({ oldpassword, password }) => {
        //         console.log('values :', oldpassword, password);
        //         try {
        //             await meApi.changePasswod(oldpassword, password);

        //             Notification.success({content: 'Đổi mật khẩu thành công'});
        //             showPromiseConfirm(password);
        //             form.resetFields();
        //             handleCancel();
        //         } catch (error) {
        //             Notification.error({content: 'Mật khẩu không đúng'});
        //         }
        //     })
        //     .catch((info) => {
        //         console.log('Validate Failed:', info);
        //     });
        setConfirmLoading(false);
    };

    const handleRevokeToken = async (password: string) => {
        try {
            const code = generateCode(20);
            if (onSaveCodeRevoke) {
                onSaveCodeRevoke(code);
            }
            const response = await meApi.revokeToken(password, code) as ResponseToken;  
            const { token, refreshToken } = response;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);

            Notification.success({content: 'Đăng xuất khỏi các thiết bị thành công'});
        } catch (error) {
            Notification.error({content: 'Đã có lỗi xảy ra'});
        }
    };

    const showPromiseConfirm = (password: string) => {
        confirm({
            title: 'Bạn có muốn đăng xuất ra khỏi các thiết bị khác ? ',
            icon: <IcHelper size="large" />,
            content: 'Khi chọn "Đồng ý" tất cả các tài khoản ở các thiết bị khác sẻ tự động đăng xuất',
            onOk: () => handleRevokeToken(password),
            okText: 'Đồng ý',
            cancelText: 'Hủy',
        });
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    return (
        <Modal
            title="Đổi mật khẩu"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            okText="Thay đổi"
            okType={ isVerifyForm ? 'primary' : 'tertiary'}
            cancelText="Hủy"
            centered
        >
            <Form
                {...formItemLayout}
                name="changepassword"
                initValues={resetPasswordSchema}
                style={{ width: 400}}
                autoScrollToError
            >
                <Form.Input
                    mode="password"
                    field="oldpassword"
                    label= "Mật khẩu cũ"
                    style={{ width: '100%' }}
                    rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mật khẩu cũ",
                    },
                    ]}
                    placeholder="Nhập mật khẩu cũ"
                />
                <Form.Input
                    mode="password"
                    field="password"
                    label="Mật khẩu mới"
                    style={{ width: '100%' }}
                    rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới",
                    },
                    ]}
                    placeholder="Nhập mật khẩu mới"
                />
                <Form.Input
                    mode="password"
                    field="passwordconfirm"
                    label="Nhập lại mật khẩu mới"
                    style={{ width: '100%' }}   
                    rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu mới",
                    },
                    ]}
                    placeholder="Nhập lại mật khẩu mới"
                />
            </Form>
        </Modal>
    );
};

export default ModalChangePassword;
