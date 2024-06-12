import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Table, Button, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Message from "../../components/Message";

const AdManagementUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState(null);

    const [form] = Form.useForm();

    const handleOpenModalDelete = (data) => {
        setOpenModalDelete(true);
        setSelectedUsers(data);
    };

    const handleOpenModalEdit = (data) => {
        setSelectedUsers(data);
        setOpenModalEdit(true);
        form.setFieldsValue({
            username: data.name,
            phone: data.phone,
        });
    };

    const onFinish = (data) => {
        const apiURL = `http://localhost:3001/api/user/update-user/${selectedUsers._id}`;
        try {
            const res = axios.put(apiURL, {
                name: data.username,
                phone: data.phone,
            });
            if (res) {
                setOpenModalEdit(false);
                Message.sendSuccess("Cập nhật thành công");

                setAllUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === selectedUsers._id
                            ? {
                                  ...user,
                                  name: data.username,
                                  phone: data.phone,
                              }
                            : user
                    )
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = () => {
        const apiURL = `http://localhost:3001/api/user/delete-user/${selectedUsers._id}`;
        try {
            const res = axios.delete(apiURL);
            if (res) {
                Message.sendSuccess("Xoá thành công");
                setAllUsers((prevUsers) =>
                    prevUsers.filter((user) => user._id !== selectedUsers._id)
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setOpenModalDelete(false);
        }
    };

    const columns = [
        {
            title: "STT",
            align: "center",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Ngày sinh",
            dataIndex: "date",
            key: "dob",
            align: "center",
            render: (text, record) => dayjs(record.date, "DD/MM/YYYY").format("DD/MM/YYYY"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "SĐT",
            dataIndex: "phone",
            key: "phone",
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            render: (text, record) => (
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        type="primary"
                        onClick={() => handleOpenModalEdit(record)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        danger
                        type="primary"
                        onClick={() => handleOpenModalDelete(record)}
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    const handleCancel = () => {
        setOpenModalDelete(false);
        setSelectedUsers(null);
    };

    const handleCancelEdit = () => {
        setOpenModalEdit(false);
        setSelectedUsers(null);
        form.resetFields();
    };

    const fetchData = useCallback(async () => {
        try {
            const apiURL = `http://localhost:3001/api/user/getAll`;
            const res = await axios.get(apiURL);
            if (res) {
                setAllUsers(res?.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div className="wrapper">
            <div className="wrapper-content">
                <h4 className="wrapper-content__title">Quản lý người dùng</h4>
                <div className="wrapper-content__table">
                    <Table columns={columns} dataSource={allUsers} />
                </div>
            </div>
            <div className="modal-delete">
                <Modal
                    open={openModalDelete}
                    title="Bạn có chắc chắc muốn xóa người dùng này?"
                    onOk={handleDeleteUser}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={handleDeleteUser}
                        >
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <p style={{ fontSize: "18px" }}>
                        Xác nhận xóa người dùng{" "}
                        <strong>{selectedUsers?.name}</strong>?
                    </p>
                </Modal>
            </div>
            <div className="modal-edit">
                <Modal
                    open={openModalEdit}
                    title="Chỉnh sửa người dùng"
                    onCancel={handleCancelEdit}
                    footer={[
                        <Button key="back" onClick={handleCancelEdit}>
                            Hủy
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            form="form_update"
                            htmlType="submit"
                        >
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <Form
                        id="form_update"
                        name="basic"
                        layout="vertical"
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            initialValue={selectedUsers?.name}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            initialValue={selectedUsers?.phone}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default AdManagementUsers;
