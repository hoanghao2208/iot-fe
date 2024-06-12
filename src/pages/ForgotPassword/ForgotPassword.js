import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleForgotPassword = async (value) => {
        try {
            const { email } = value;
            localStorage.setItem("emailToReset", email);
            const apiURL = "http://localhost:3001/api/user/send-reset-code";
            setLoading(true);
            const res = await axios.post(apiURL, {
                email,
            });
            if (res?.data.status === "OK") {
                Message.sendSuccess(
                    "Vui lòng kiểm tra email của bạn để có thể lấy mã OTP"
                );
                navigate("/confirm-otp");
            } else {
                console.log(res);
                Message.sendError("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Spin tip="Loading" size="large" spinning={loading}>
            <h2 className="wrapper__register-title">Lấy lại mật khẩu</h2>
            <span className="wrapper__intro">
                Vui lòng nhập email đăng ký của bạn để có thể đặt lại mật khẩu
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
                    onFinish={handleForgotPassword}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email của bạn",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
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
        </Spin>
    );
};

export default ForgotPassword;
