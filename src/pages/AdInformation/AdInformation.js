import React from "react";
import "./style.scss";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { NavLink, Routes, Route } from "react-router-dom";
import ChangePasswd from "../../components/InformationPersonal/ChangePasswd";
import ViewInformation from "../../components/InformationPersonal/ViewInformation";

export default function AdInformation() {
    return (
        <div className="container-InformationPersonalPage">
            <div className="wrapper-content">
                <div className="informationpersonal-left-section-dashboard">
                    <ul className="-mb-px flex flex-wrap">
                        <li className="mr-2">
                            <NavLink
                                to="/admin-information-personal"
                                end
                                style={({ isActive }) => ({
                                    color: isActive ? "blue" : "black",
                                })}
                            >
                                <div className="informationpersonal-left-section-dashboard-items-detail">
                                    <UserOutlined />
                                    <p>Thông tin cá nhân</p>
                                </div>
                            </NavLink>
                        </li>
                        <li className="mr-2">
                            <NavLink
                                to="/admin-information-personal/change-passwd"
                                style={({ isActive }) => ({
                                    color: isActive ? "blue" : "black",
                                })}
                            >
                                <div className="informationpersonal-left-section-dashboard-items-detail">
                                    <EditOutlined />
                                    <p>Thay đổi mật khẩu</p>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="informationpersonal-right-section-dashboard">
                    <Routes>
                        <Route
                            path="change-passwd"
                            element={<ChangePasswd />}
                        />
                        <Route path="/" element={<ViewInformation />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
