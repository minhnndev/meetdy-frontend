import React from "react";
import ServiceMe from "@/api/meApi";
import generateCode from "@/utils/generateCode";
import { Button, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { useState } from "react";

const ChangePasswordModal = ({ visible, onCancel, onSaveCodeRevoke }) => {
  const [loading, setLoading] = useState(false);

  const onOk = async (values: any) => {
    setLoading(true);
    const { oldPassword, newPassword } = values;
    try {
      await ServiceMe.changePassword({ oldPassword, newPassword });
      Toast.success("Đổi mật khẩu thành công");

      Modal.warning({
        title: "Bạn có muốn đăng xuất ra khỏi các thiết bị khác ?",
        content:
          'Khi chọn "Đồng ý" tất cả các tài khoản ở các thiết bị khác sẻ tự động đăng xuất',
        onOk: () => handleRevokeToken(newPassword),
        okText: "Đồng ý",
        cancelText: "Hủy",
      });
      onCancel();
    } catch (error) {
      Toast.error("Mật khẩu không đúng");
    }

    setLoading(false);
  };

  const handleRevokeToken = async (password) => {
    try {
      const key = generateCode(20);
      if (onSaveCodeRevoke) {
        onSaveCodeRevoke(key);
      }
      const response = await ServiceMe.revokeToken({ password, key });
      const { token, refreshToken } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      Toast.success("Đăng xuất khỏi các thiết bị thành công");
    } catch (error) {
      Toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <Modal
      visible={visible}
      title="Đổi mật khẩu"
      footer={null}
      onCancel={onCancel}
    >
      <Form
        initValues={{
          oldPassword: "",
          newPassword: "",
        }}
        onSubmit={onOk}
      >
        {({ formState }) => (
          <>
            <Form.Input
              mode="password"
              field="oldPassword"
              label="Mật khẩu hiện tại"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu hiện tại không được bỏ trống.",
                },
              ]}
              placeholder="Nhập mật khẩu hiện tại của bạn"
            />
            <Form.Input
              mode="password"
              field="newPassword"
              label="Mật khẩu mới"
              rules={[
                {
                  min: 8,
                  max: 50,
                  message: "Mật khẩu phải từ 8-50 ký tự",
                },
                {
                  required: true,
                  message: "Mật khẩu mới không được bỏ trống.",
                },
              ]}
              placeholder="Nhập mật khẩu mới của bạn"
            />
            <Form.Input
              mode="password"
              field="passwordconfirm"
              label="Nhập lại mật khẩu"
              trigger="blur"
              rules={[
                {
                  validator: (_rule, value) =>
                    value === formState.values.newPassword,
                  message: "Mật khẩu không khớp",
                },
              ]}
              placeholder="Nhập lại mật khẩu mới của bạn"
            />
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
                onClick={onCancel}
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

export { ChangePasswordModal };
