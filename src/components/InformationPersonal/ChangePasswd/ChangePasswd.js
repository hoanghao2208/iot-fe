import React from "react";
import "./style.scss";
import { Button, Form, Input } from "antd";
import Message from "../../Message";
import axios from "axios";

export default function ChangePasswd() {
    const [form] = Form.useForm();

    const hanldeChangePassword = async (value) => {
        const { password, newPassword, rePassword } = value;
        if (password === newPassword && newPassword === rePassword) {
            Message.sendError("Mật khẩu không thay đổi", 4);
        } else if (newPassword !== rePassword) {
            Message.sendError("Xác nhận mật khẩu không chính xác", 4);
        } else {
            try {
                const userId = localStorage.getItem("userId");
                const apiURL = `http://localhost:3001/api/user/reset-password-code/${userId}`;
                const data = {
                    password,
                    rePassword: password,
                    newPassword,
                };
                const res = await axios.post(apiURL, data);
                if (res?.data.status === 200) {
                    console.log("reset password", res);
                    Message.sendSuccess("Thay đổi mật khẩu thành công");
                    form.resetFields();
                } else {
                    Message.sendError("Mật khẩu cũ không chính xác", 4);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="changepasswd">
            <Form
                form={form}
                name="changepasswd-form"
                layout="vertical"
                wrapperCol={{
                    span: 30,
                }}
                onFinish={hanldeChangePassword}
                className="changepasswd-form"
            >
                <Form.Item
                    label="Nhập mật khẩu cũ"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu cũ!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Mật khẩu cũ" />
                </Form.Item>

                <Form.Item
                    label="Nhập mật khẩu mới"
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu mới!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu mới"
                    name="rePassword"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập lại mật khẩu mới!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu mới" />
                </Form.Item>

                <div className="wrapper__change-button">
                    <Button type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </div>
            </Form>
        </div>
    );
}
