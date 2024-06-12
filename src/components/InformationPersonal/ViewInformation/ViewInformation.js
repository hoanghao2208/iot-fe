import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { HomeOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Upload, Modal, Spin } from "antd";
import axios from "axios";
import Message from "../../Message";
import dayjs from "dayjs";

export default function ViewInformation() {
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [newBirthday, setNewBirthday] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [imgURL, setImgURL] = useState("");
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const dateFormat = "DD/MM/YYYY";
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId !== null) {
            setUserId(storedUserId);
        }
    }, [userId]);

    const fetchData = useCallback(async () => {
        try {
            if (userId) {
                const apiURL = `http://localhost:3001/api/user/get-detail/${userId}`;
                const res = await axios.get(apiURL);
                console.log("resss", res);
                if (res) {
                    setUserData(res?.data.data);
                    setNewName(res?.data.data.name);
                    setNewPhone(res?.data.data.phone);
                    setBirthday(dayjs(res.data.data.date, dateFormat));
                    setImgURL(res?.data.data.avatar);
                }
            }
        } catch (error) {
            console.log("error fetching", error);
        }
    }, [userId]);

    const handleUpdate = useCallback(async () => {
        if (isUpdating === false) {
            setIsUpdating(true);
        } else {
            if (userId) {
                const res = await axios.put(
                    `http://localhost:3001/api/user/update-user/${userId}`,
                    {
                        name: newName,
                        phone: newPhone,
                        date: newBirthday,
                    }
                );
                if (res) {
                    Message.sendSuccess("Cập nhật thành công");
                } else {
                    Message.sendError("Có lỗi xãy ra, Cập nhật thất bại");
                }
            }
            setIsUpdating(false);
        }
    }, [isUpdating, newBirthday, newName, newPhone, userId]);

    const handleChangeDate = (_, value) => {
        setNewBirthday(value);
        setBirthday(dayjs(value, dateFormat));
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleUpload = async ({ fileList }) => {
        if (fileList) {
            const formData = new FormData();
            formData.append("images", fileList[0].originFileObj);
            try {
                const token = localStorage.getItem("accessToken");
                setLoading(true);
                setOpenModal(false);
                const res = await axios.post(
                    "http://localhost:3001/api/user/upload-avatar",
                    formData,
                    {
                        headers: {
                            token: `Bearer ${token}`,
                        },
                    }
                );
                setLoading(false);
                setImgURL(res?.data.avatarPath);
                Message.sendSuccess("Cập nhật ảnh đại diện thành công");
            } catch (error) {
                Message.sendError("Cập nhật ảnh đại diện thất bại");
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData, isUpdating]);

    return (
        <Spin tip="Loading" size="large" spinning={loading}>
            <div className="container-viewinformation">
                <div className="viewinformation-bg-img"></div>
                <div className="viewinformation-common">
                    <div className="viewinformation-left-section-common">
                        <div
                            className="upload-avt"
                            onClick={() => setOpenModal(true)}
                        >
                            Cập nhật
                        </div>
                        <img src={imgURL} alt="avatar" />
                    </div>
                    <div>
                        <Modal
                            title="Cập nhật Avatar"
                            open={openModal}
                            // onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <Upload.Dragger
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUpload}
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Chọn ảnh đại diện của bạn
                                </p>
                            </Upload.Dragger>
                        </Modal>
                    </div>
                    <div className="viewinformation-right-section-common ">
                        <div>
                            <div className="user-info">
                                <h1 className="user-info__name">
                                    {userData?.name}
                                </h1>
                                <div className="user-info__email">
                                    <span>
                                        <HomeOutlined />
                                    </span>
                                    <span className="user-info__email--detail">
                                        {userData?.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="viewinformation-bg-null"></div>
                <div className="viewinformation-detail">
                    <div className="viewinformation-detail-name">
                        <p>Họ và tên</p>
                        <Input
                            placeholder="Họ và tên"
                            value={newName}
                            disabled={!isUpdating}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div className="viewinformation-detail-date">
                        <p>Ngày sinh</p>
                        <DatePicker
                            onChange={handleChangeDate}
                            disabled={!isUpdating}
                            value={birthday}
                            format={dateFormat}
                        />
                    </div>
                    <div className="viewinformation-detail-address">
                        <p>Số điện thoại</p>
                        <Input
                            placeholder="Số điện thoại"
                            value={newPhone}
                            disabled={!isUpdating}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    </div>
                    <div className="viewinformation-detail-address">
                        <p>Địa chỉ Email</p>
                        <Input
                            placeholder="Địa chỉ Email"
                            value={userData?.email}
                            disabled
                        />
                    </div>

                    <div className="viewinformation-detail-button-update">
                        <div className="wrapper-button">
                            <Button
                                type="default"
                                onClick={() => setIsUpdating(false)}
                            >
                                Trở lại
                            </Button>
                            <Button type="primary" onClick={handleUpdate}>
                                {isUpdating ? "Xác nhận" : "Cập nhật thông tin"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
}