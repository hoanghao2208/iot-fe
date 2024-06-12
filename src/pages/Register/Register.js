import React, {useState} from "react";
import "./index.scss";
import { Button, Form, Input, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs";
import Message from "../../components/Message";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [birthday, setBirthday] = useState(null);
    const [date, setDate] = useState("");
    const [confirmPassword, setconfirmPassword] = useState()

    const handleRegister = async (e) => {
        try {
            const apiUrl = 'http://localhost:3001/api/user/signup'
            const data = {
                name,
                email,
                phone,
                date,
                password,
                confirmPassword
            }
            const response = await axios.post(apiUrl, data)
            console.log(response)
            if (response) {
                if (response.data.status === 200) {
                    Message.sendSuccess("Đăng ký thành công");
                    navigate('/login')
                }
                else if (response.data.status === 401){
                    Message.sendError(response.data.message)
                }
            }
        } catch (err) {
            console.error(err)
        }
    };

    const handleChangeDate = (_, value) => {
        setDate(value);
        setBirthday(dayjs(value, "DD/MM/YYYY"));
    }

    return (
        <>
            <h2 className="wrapper__register-title">Đăng ký</h2>
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
                    onFinish={handleRegister}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên của bạn",
                            },
                        ]}
                    >
                        <Input onChange = {(e) => setName(e.target.value)} placeholder="Họ và tên" />
                    </Form.Item>

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
                        <Input onChange = {(e) => setEmail(e.target.value)} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại của bạn",
                            },
                        ]}
                    >
                        <Input onChange = {(e) => setPhone(e.target.value)} placeholder="Số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Ngày sinh"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập ngày sinh của bạn",
                            },
                        ]}
                    >
                        <DatePicker
                            onChange={handleChangeDate}
                            value={birthday}
                            format={"DD/MM/YYYY"}
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
                        <Input.Password onChange = {(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirm_password"
                        rules={[
                            {
                                required: true,
                                message: "Xác nhận mật khẩu của bạn!",
                            },
                        ]}
                    >
                        <Input.Password onChange = {(e) => setconfirmPassword(e.target.value)} placeholder="Xác nhận mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="wrapper__register-button"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="wrapper__navigate">
                Đã có tài khoản?
                <Link to={"/login"}>
                    <span>Đăng nhập</span>
                </Link>
            </div>
        </>
    );
};

export default Register;