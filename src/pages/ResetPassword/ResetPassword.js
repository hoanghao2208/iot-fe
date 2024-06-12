import { Button, Form, Input } from "antd";
import React from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import axios from "axios";

const ResetPassword = () => {
    const navigate = useNavigate();
    const handleResetPassword = async (value) => {
        const { newPassword, rePassword } = value;
        if (newPassword !== rePassword) {
            Message.sendError("Xác nhận mật khẩu không chính xác", 4);
        } else {
            try {
                const id = localStorage.getItem("idReset");
                const apiURL = `http://localhost:3001/api/user/update-user/${id}`;
                const res = await axios.put(apiURL, {
                    password: newPassword,
                });
                if (res) {
                    Message.sendSuccess("Cập nhật mật khẩu thành công");
                    localStorage.removeItem("idReset");
                    localStorage.removeItem("emailToReset");
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <h2 className="wrapper__register-title">Cập nhật mật khẩu</h2>
            <span className="wrapper__intro">
                Vui lòng cập nhật mật khẩu mới của bạn
            </span>
            <div>
                <Form
                    name="register-form"
                    layout="vertical"
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: "700px",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    className="wrapper__form"
                    onFinish={handleResetPassword}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới của bạn",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu mới" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="rePassword"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Vui lòng nhập mật khẩu xác nhận của bạn",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="wrapper__register-button"
                        >
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="wrapper__navigate">
                <div className="wrapper__to-register">
                    Chưa có tài khoản?
                    <Link to={"/register"}>
                        <span>Đăng ký</span>
                    </Link>
                </div>
                <div className="wrapper__to-login">
                    <Link to={"/login"}>
                        <span>Đăng nhập</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
