import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";

const AdminHeader = () => {
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("accessToken");
    };

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

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/admin-information-personal">Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/admin-information-personal/change-passwd">
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
        <div className="wrapper-header">
            <Link className="wrapper-header--logo" to="/admin-management-farms">
                <span className="wrapper-header--iot">IOT</span>
                <span className="wrapper-header--farm">farm</span>
            </Link>
            <div className="wrapper-header__right">
                <div className="wrapper-header__right--navigate">
                    <Link
                        className="wrapper-header__right--farms"
                        to="/admin-management-farms"
                    >
                        Quản lý nông trại
                    </Link>
                    <Link
                        className="wrapper-header__right--users"
                        to="/admin-management-users"
                    >
                        Quản lý người dùng
                    </Link>
                </div>
                <div className="wrapper-header__right--dropdown">
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Link className="" to="/admin-information-personal">
                            <img
                                src={imgURL}
                                alt="avatar"
                                className="admin-avt"
                            />
                        </Link>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
