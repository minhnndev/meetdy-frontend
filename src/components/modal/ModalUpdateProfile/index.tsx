import { Col, Modal, Row } from '@douyinfe/semi-ui';
import meApi from '@/api/meApi';
import { UserProfile, setAvatarProfile } from '@/redux/slice/accountSlice';
// import DateOfBirthField from 'customfield/DateOfBirthField';
// import GenderRadioField from 'customfield/GenderRadioField';
import { EditCoverImage, EditAvatar, EditDateOfBirth, EditGender } from '@/components/molecules';
import { BasicInputField } from '@/components/atoms';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Formik, Form } from 'formik';
import { z } from 'zod';
import './style.css';

interface ModalUpdateProfileProps {
    isVisible?: boolean,
    onCancel?: (value?: boolean) => void,
    onOk?: (value?: boolean) => void,
    loading?: boolean,
}

const ModalUpdateProfile = (props: ModalUpdateProfileProps) => {
    const { isVisible, onCancel, onOk, loading } = props;
    const dispatch = useDispatch();
    const userProfile = useSelector((state: any) => state.account.userProfile) as UserProfile | null;
    const formRef = useRef();

    const [avatar, setAvatar] = useState<File>(null);
    const [coverImg, setCoverImg] = useState<File>(null);
    const [isClear, setIsClear] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const refInitValue = useRef<any>();

    const handleGetCoverImg = (coverImg: File) => {
        setCoverImg(coverImg);
    };

    const handleGetAvatar = (avatar: File) => {
        setAvatar(avatar);
    };

    useEffect(() => {
        if (isVisible) {
            setIsClear(false);
            refInitValue.current = {
                name: userProfile ?? userProfile.name,
                dateOfBirth: userProfile ?? userProfile.dateOfBirth,
                gender: userProfile ?? userProfile.gender,
            };
        }
    }, [isVisible]);

    const checkChangeValue = (value1, value2) => {
        if (value1.name !== value2.name) {
            return false;
        }
        if (value1.dateOfBirth !== value2.dateOfBirth) {
            return false;
        }
        if (value1.gender !== value2.gender) {
            return false;
        }
        return true;
    };

    const handleCancel = () => {
        onCancel(false);
        setIsClear(true);
        setCoverImg(null);
        setAvatar(null);
    };

    const handleSubmit = async (values) => {
        setConfirmLoading(true);

        try {
            if (!checkChangeValue(values, refInitValue.current)) {
                const { name, dateOfBirth, gender } = values;
                await meApi.updateProfile(name, dateOfBirth, gender);
            }

            if (coverImg) {
                const frmData = new FormData();
                frmData.append('file', coverImg);
                // const response = await meApi.updateCoverImage(frmData);
            }

            if (avatar) {
                const frmData = new FormData();
                frmData.append('file', avatar);
                const response = await meApi.updateAvatar(frmData) as any;
                dispatch(setAvatarProfile(response.avatar));
            }
            setIsClear(true);
        } catch (error) {
            console.log(error);
        }

        setConfirmLoading(false);

        if (onCancel) {
            onCancel();
        }
    }

    const handleOke = () => {
        if (formRef.current) {
            const ref = formRef.current as any;
            ref.handleSubmit();
        }
    };

    const formikSchemas = z.object({
        name: z.
            string()
            .min(1, { message: 'Tên không được bỏ trống' })
            .max(100, { message: 'Tên tối đa 100 kí tự' }),
    });

    return (
        <Modal
            title="Cập nhật thông tin"
            visible={isVisible}
            onOk={handleOke}
            onCancel={handleCancel}
            width={450}
            bodyStyle={{ padding: 0 }}
            okText="Cập nhật"
            cancelText="Hủy"
            centered
            confirmLoading={confirmLoading}
        >
            <div className="profile-update_wrapper">
                <div className="profile-update_img">
                    <div className="profile-update_cover-image">
                        <div className="profile-update_upload">
                            <EditCoverImage
                                coverImg={userProfile ? userProfile.coverImage : ''}
                                getFile={handleGetCoverImg}
                                isClear={isClear}
                            />
                        </div>

                        <div className="profile-update_avatar">
                            <EditAvatar
                                avatar={userProfile ? userProfile.avatar : ''}
                                getFile={handleGetAvatar}
                                isClear={isClear}
                            />
                        </div>
                    </div>
                </div>

                <div className="profile-update_info">
                    <Formik
                        innerRef={formRef}
                        initialValues={userProfile ? {
                            name: userProfile.name,
                            dateOfBirth: userProfile.dateOfBirth,
                            gender: userProfile.gender ? 1 : 0,
                        } : {}}
                        onSubmit={handleSubmit}
                        validationSchema={formikSchemas}
                        enableReinitialize={true}
                    >
                        {() => {
                            return (
                                <Form>
                                    <Row gutter={[0, 16]}>
                                        <Col span={24}>
                                            <p>Tên </p>
                                            <FastField
                                                name="name"
                                                placeholder="Nhập tên"
                                                component={BasicInputField}
                                                type="text"
                                                maxLength={100}
                                            ></FastField>
                                        </Col>

                                        <Col span={24}>
                                            <p>Ngày sinh</p>
                                            <FastField
                                                name="dateOfBirth"
                                                component={EditDateOfBirth}
                                            ></FastField>
                                        </Col>

                                        <Col span={24}>
                                            <p>Giới tính</p>
                                            <FastField
                                                name="gender"
                                                component={EditGender}
                                            ></FastField>
                                        </Col>
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
}

ModalUpdateProfile.propTypes = {
    isVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    loading: PropTypes.bool,
};

ModalUpdateProfile.defaultProps = {
    isVisible: false,
    onCancel: null,
    onOk: null,
    loading: false,
};

export default ModalUpdateProfile;
