import React from "react";
import { IconHelpCircle } from "@douyinfe/semi-icons";
import { Button, Form, Tooltip } from "@douyinfe/semi-ui";

const GetOTPForm = ({ handleGetOTP }) => {
    return (
        <Form onSubmit={(values) => handleGetOTP(values.username)}>
            <Form.Input
                field="username"
                label={{
                    text: "Tài khoản",
                    extra: (
                        <Tooltip content="Mã OTP sẽ được gửi đến Email hoặc SĐT này">
                            <IconHelpCircle style={{ color: "var(--semi-color-text-2)" }} />
                        </Tooltip>
                    ),
                }}
                style={{ width: "100%" }}
                rules={[
                    {
                        required: true,
                        message: "Tài khoản không được bỏ trống.",
                    },
                ]}
                placeholder="Nhập Email hoặc SĐT"
            ></Form.Input>
            <Button htmlType="submit" theme="solid" type="primary" block className="submit-button">
                Xác nhận
            </Button>
        </Form>
    );
};

export default GetOTPForm;
