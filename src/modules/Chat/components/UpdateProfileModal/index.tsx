import React from "react";
import { Button, Form, Modal } from "@douyinfe/semi-ui";
import UploadCoverImage from "../UploadCoverImage";
import UploadAvatar from "../UploadAvatar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { TUpdateProfile } from "@/models/me.model";
import ServiceMe from "@/api/meApi";
import { setAvatarProfile } from "@/redux/slice/globalSlice";
import { pick } from "lodash";

const UpdateProfileModal = ({ visible, onCancel }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.global);
  const [userProfile, setUserProfile] = useState<TUpdateProfile>(
    pick(user, ["name", "dateOfBirth", "gender"])
  );
  const [coverImg, setCoverImg] = useState<File | string>(user?.coverImage);
  const [avatar, setAvatar] = useState<File>(null);
  const [loading, setLoading] = useState(false);

  const validateDate = (date: number, month: number, year: number) => {
    if (date < 1) return false;
    const daysInMonth = () => {
      if (month === 2) return year % 4 === 0 ? 29 : 28;
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
      if ([4, 6, 9, 11].includes(month)) return 30;
      return Number.POSITIVE_INFINITY;
    };
    return date <= daysInMonth();
  };

  const handleSubmit = async (values: TUpdateProfile) => {
    setLoading(true);
    try {
      if (JSON.stringify(values) != JSON.stringify(userProfile)) {
        await ServiceMe.updateProfile(values);
        setUserProfile(values);
      }

      if (typeof coverImg != "string") {
        const formData = new FormData();
        formData.append("file", coverImg);
        const response = await ServiceMe.updateCoverImage(formData);
        setCoverImg(response.coverImage);
      }

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        const response = await ServiceMe.updateAvatar(formData);
        dispatch(setAvatarProfile(response.avatar));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    onCancel();
  };

  const handleClose = () => {
    setCoverImg(user?.coverImage);
    setAvatar(null);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật thông tin"
      onCancel={handleClose}
      footer={null}
    >
      <UploadCoverImage coverImg={coverImg} setCoverImg={setCoverImg} />
      <UploadAvatar avatar={user.avatar} setAvatar={setAvatar} />

      <Form
        initValues={{
          name: userProfile.name,
          date: userProfile.dateOfBirth.day,
          month: userProfile.dateOfBirth.month,
          year: userProfile.dateOfBirth.year,
          gender: +userProfile.gender,
        }}
        onSubmit={(values) =>
          handleSubmit({
            name: values.name,
            gender: values.gender,
            dateOfBirth: {
              day: values.date,
              month: values.month,
              year: values.year,
            },
          })
        }
      >
        {({ formState }) => (
          <>
            <Form.Input
              field="name"
              label="Tên người dùng"
              placeholder="Nhập tên của bạn"
              rules={[
                {
                  required: true,
                  message: "Tên người dùng không được bỏ trống",
                },
              ]}
            />

            <div style={{ display: "flex" }}>
              <Form.InputNumber
                field="date"
                label="Ngày sinh"
                placeholder="Ngày"
                hideButtons
                rules={[
                  {
                    validator: (_rule, value) =>
                      validateDate(
                        value,
                        formState.values.month,
                        formState.values.year
                      ),
                    message: "Không hợp lệ",
                  },
                ]}
              />
              <Form.InputNumber
                field="month"
                noLabel
                fieldStyle={{ marginTop: 24, marginLeft: 8 }}
                placeholder="Tháng"
                hideButtons
                rules={[
                  {
                    validator: (_rule, value) => value >= 1 && value <= 12,
                    message: "Không hợp lệ",
                  },
                ]}
              />
              <Form.InputNumber
                field="year"
                noLabel
                fieldStyle={{ marginTop: 24, marginLeft: 8 }}
                placeholder="Năm"
                hideButtons
                rules={[
                  {
                    validator: (_rule, value) =>
                      value >= 1950 && value <= new Date().getFullYear() - 10,
                    message: "Không hợp lệ",
                  },
                ]}
              />
            </div>

            <Form.RadioGroup field="gender" label="Giới tính">
              <Form.Radio value={0}>Nam</Form.Radio>
              <Form.Radio value={1}>Nữ</Form.Radio>
            </Form.RadioGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 16,
                marginBottom: 24,
              }}
            >
              <Button
                style={{ marginRight: 12 }}
                onClick={handleClose}
                type="tertiary"
              >
                Huỷ
              </Button>
              <Button
                theme="solid"
                type="primary"
                loading={loading}
                htmlType="submit"
              >
                Xác nhận
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export { UpdateProfileModal };
