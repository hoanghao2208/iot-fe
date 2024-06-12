import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { Table, Button, Modal, Form, Input  } from "antd";
import CreateFarmForm from "./CreateFarmForm";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";

export default function AdManagementFarm() {
  const [farms, setFarms] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedFarmInfo, setExpandedFarmInfo] = useState(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getFarms();
  }, []);

  const getFarms = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const result = await axios.get(
        "http://localhost:3001/api/admin/getAllFarm",
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      setFarms(result.data.data);
      // console.log(result.data.data);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const handleOpenModalEdit = (data) => {
    setSelectedFarm(data);
    setOpenModalEdit(true);
    form.setFieldsValue({
        name: data.name,
        address: data.address,
        description: data.description
    });
  };
  const handleCancelEdit = () => {
    setOpenModalEdit(false);
    setSelectedFarm(null);
    form.resetFields();
  };

  const onFinish = async (data) => {
    const apiURL = `http://localhost:3001/api/admin/updateFarm/${selectedFarm._id}`;
    const accessToken = localStorage.getItem("accessToken");
    try {
        const res = await axios.put(apiURL, {
            name: data.name,
            address: data.address,
            description: data.description
          },
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        if (res) {
            setOpenModalEdit(false);
            Message.sendSuccess("Cập nhật thành công");

            getFarms();
        }
    } catch (error) {
        console.error(error);
    }
  };
  
  const handleDelete = async (farmId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.delete(
        `http://localhost:3001/api/admin/deleteFarm/${farmId}`,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      getFarms();
      console.log(`Farm có ID: ${farmId} đã được xoá`);
    } catch (error) {
      console.error("Lỗi khi xoá farm:", error);
    }
  };


  const handleCreateFarm = () => {
    setShowCreateForm(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleExpandRow = async (farmId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const result = await axios.get(
        `http://localhost:3001/api/admin/getFarm/${farmId}`,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result.data.data)
      setExpandedFarmInfo(result.data.data);
      setModalVisible(true);
    } catch (error) {
      // console.error("Lỗi", error);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text) => <img src={text} alt="Farm" style={{ width: "50px" }} />,
    },
    {
      title: "Tên nông trại",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div>
          <Button type="primary" danger onClick={() => handleOpenModalEdit(record)}>
            Chỉnh sửa
          </Button>{" "}
          <Link to={`/admin-management-devices/${record._id}`}><Button type="primary">Xem thiết bị</Button></Link>{" "}{" "}
          <Button onClick={() => handleDelete(record._id)}>Xoá</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <h4 className="wrapper-content__title">Quản lý nông trại</h4>

        <div className="wrapper-content__table">
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: () => null,
              rowExpandable: (result) => result._id === result?._id,
              onExpand: (_, result) => handleExpandRow(result._id),
            }}
            dataSource={farms}
          />
        </div>

        <div className="wrapper-content__createfarm centered-button">
          {!showCreateForm ? (
            <Button type="primary" onClick={handleCreateFarm}>
              THÊM NÔNG TRẠI MỚI
            </Button>
          ) : (
            <CreateFarmForm
              onCreateFarm={() => {
                getFarms();
              }}
              visible = {showCreateForm}
              setVisible = {setShowCreateForm}
            />
          )}
        </div>
      </div>
      <div className="modal-edit">
      <Modal
          title="Farm Details"
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {expandedFarmInfo && (
            <div>
              <img src={expandedFarmInfo.image} style={{ display: 'block', margin: 'auto', maxWidth: '100%', height: 'auto' }} alt="" />
              <p>ID: {expandedFarmInfo?._id}</p>
              <p>Tên: {expandedFarmInfo.name}</p>
              <p>Địa chỉ: {expandedFarmInfo.address}</p>
              <p>Mô tả: {expandedFarmInfo.description}</p>
              <p>Ngày tạo: {expandedFarmInfo.createdAt}</p>
              <p>Ngày cập nhật: {expandedFarmInfo.updatedAt}</p>
              <p>{expandedFarmInfo.__v}</p>
            </div>
          )}
        </Modal>
      </div>
      <div className="modal-edit">
                <Modal
                    open={openModalEdit}
                    title="Chỉnh sửa nông trại"
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
                            label="Name"
                            name="name"
                            initialValue={selectedFarm?.name}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            initialValue={selectedFarm?.address}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input address!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            initialValue={selectedFarm?.description}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input description!",
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
}