import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Menu, Dropdown } from "antd";
export default function Header() {
    const userId = localStorage.getItem("userId");
    const [imgURL, setImgURL] = useState("");

    const fetchData = useCallback(async () => {
        try {
            if (userId) {
                const apiURL = `http://localhost:3001/api/user/get-detail/${userId}`;
                const res = await axios.get(apiURL);
                if (res) {
                    setImgURL(res?.data.data.avatar);
                }
            }
        } catch (error) {
            console.log("error fetching", error);
        }
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/information-personal">Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/information-personal/change-passwd">
                    Thay đổi mật khẩu
                </Link>
            </Menu.Item>
            <Menu.Item key="3" onClick={handleLogout} danger>
                <Link to="/login">Đăng xuất</Link>
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div className="header">
            <div className="bg">
                <Link className="header-logo" to="/">
                    <span className="iot">IOT</span>
                    <span className="farm">farm</span>
                </Link>

                <div className="items">
                    <Link className="" to="/farms-information">
                        Thông tin trang trại
                    </Link>

                    <Link className="" to="/statistical/*">
                        Thống kê
                    </Link>

                    <Link className="" to="/user-management-devices">
                        Quản lý thiết bị
                    </Link>
                </div>

                <div className="col-xl-auto col-md-auto info">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Link className="" to="/information-personal">
                            <img src={imgURL} alt="avatar" />
                        </Link>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
