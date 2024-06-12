import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async (e) => {
        try {
            const apiUrl = "http://localhost:3001/api/user/login";
            const data = {
                email: email,
                password: password,
            };
            const response = await axios.post(apiUrl, data);
            console.log(response);
            if (response) {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("role", response.data.role);
                localStorage.setItem("accessToken", response.data.access_token);

                if (!response.data.role && response.data.status === 200) {
                    navigate("/");
                } else if (response.data.role && response.data.status === 200) {
                    navigate("/admin-management-farms");
                } else {
                    Message.sendError("Sai Email hoặc Mật khẩu, vui lòng đăng nhập lại!",[2]);
                    // Chỗ này tự làm toast message vô
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <h2 className="wrapper__register-title">Đăng nhập</h2>
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
                    onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email",
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="wrapper__register-button"
            >
              Đăng nhập
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
        <div className="wrapper__forgot">
          <Link to={"/forgot-password"}>
            <span>Quên mật khẩu</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
