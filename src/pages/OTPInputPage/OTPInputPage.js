import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message";

const OTPInputPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleConfirmOTP = async (value) => {
        try {
            const { otp } = value;
            const email = localStorage.getItem("emailToReset");
            const apiURL = "http://localhost:3001/api/user/checkValidCode";
            setLoading(true);
            const res = await axios.post(apiURL, {
                email,
                passwordResetCode: otp,
            });
            if (res?.data.status === 200) {
                Message.sendSuccess("Vui lòng cập nhật mật khẩu mới");
                localStorage.setItem("idReset", res?.data.data._id);
                navigate("/reset-password");
            } else {
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
                Vui lòng nhập email mã OTP được gửi qua email của bạn
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
                    onFinish={handleConfirmOTP}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mã OTP"
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mã OTP của bạn",
                            },
                        ]}
                    >
                        <Input placeholder="OTP" />
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

export default OTPInputPage;
