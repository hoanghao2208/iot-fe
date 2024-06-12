import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Table, Button, Modal, Form, Input} from "antd";
import { useParams } from 'react-router-dom';
import CreateDataEquipmentForm from "./CreateDataEquipmentForm";
import CreateControlEquipmentForm from "./CreateControlEquipmentForm";
import Message from "../../components/Message";

export default function AdManagementDevice() {

    const { farmID } = useParams();
    const [dataEquipments, setDataEquipments] = useState([]);
    const [controlEquipments, setControlEquipments] = useState([]);

    const [showCreateDataEquipmentForm, setShowCreateDataEquipmentForm] = useState(false);
    const [showCreateControlEquipmentForm, setShowCreateControlEquipmentForm] = useState(false);

    const [editData, setEditData] = useState(null);
    const [editData1, setEditData1] = useState(null);

    const [expandedDataEquipmentInfo, setExpandedDataEquipmentInfo] = useState(null);
    const [expandedControlEquipmentInfo, setExpandedControlEquipmentInfo] = useState(null);

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalEdit1, setOpenModalEdit1] = useState(false);

    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedDevice1, setSelectedDevice1] = useState(null);

    const [form] = Form.useForm();

    const closeModal = () => {
      setModalVisible(false);
    };
    const closeModal1 = () => {
      setModalVisible1(false);
    };

    useEffect(() => {
      console.log("aaaaaaaaaaaaaaaaa");
      getDataEquipments();
      getControlEquipments();
    }, []);
  
    const getDataEquipments = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        var result;
        if(farmID){result = await axios.get(
          `http://localhost:3001/api/dequip/getAll/${farmID}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );}
        else{result = await axios.get(
          "http://localhost:3001/api/dequip/getAll",
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );

        }
        setDataEquipments(result.data.data);
      } catch (error) {
        console.error("Lỗi", error);
      }
    };

    const handleOpenModalEdit = (data) => {
      setSelectedDevice(data);
      setOpenModalEdit(true);
      form.setFieldsValue({
        name: data.name,
        key: data.key,
        typ: data.typ,
        farmId: data.farmId,
        min: data.min,
        min_action: data.min_action,
        max: data.max,
        max_action: data.max_action,
        auto: data.auto,
      });
    };
    
    const handleOpenModalEdit1 = (data) => {
      setSelectedDevice1(data);
      setOpenModalEdit1(true);
      form.setFieldsValue({
        name: data.name,
        key: data.key,
        typ: data.typ,
        farmId: data.farmId,
        status: data.status,
      });
    };

    const handleCancelEdit = () => {
      setOpenModalEdit(false);
      setSelectedDevice(null);
      form.resetFields();
    };

    const handleCancelEdit1 = () => {
      setOpenModalEdit1(false);
      setSelectedDevice1(null);
      form.resetFields();
    };

    const onFinish = async (data) => {
      const apiURL = `http://localhost:3001/api/dequip/update-equipment/${selectedDevice._id}`;
      const accessToken = localStorage.getItem("accessToken");
      try {
          const res = await axios.put(apiURL, data,
            {
              headers: {
                token: `Bearer ${accessToken}`,
              },
            }
          );
          if (res) {
              setOpenModalEdit(false);
              Message.sendSuccess("Cập nhật thành công");
  
              getDataEquipments();
          }
      } catch (error) {
          console.error(error);
      }
    };

    const onFinish1 = async (data) => {
      const apiURL = `http://localhost:3001/api/cequip/update-equipment/${selectedDevice1._id}`;
      const accessToken = localStorage.getItem("accessToken");
      try {
          const res = await axios.put(apiURL, data,
            {
              headers: {
                token: `Bearer ${accessToken}`,
              },
            }
          );
          if (res) {
              setOpenModalEdit1(false);
              Message.sendSuccess("Cập nhật thành công");
  
              getControlEquipments();
          }
      } catch (error) {
          console.error(error);
      }
    };

    const handleCreateDataEquipment = () => {
      setEditData(null);
      setShowCreateDataEquipmentForm(true);
    };
    const handleCreateControlEquipment = () => {
      setEditData1(null);
      setShowCreateControlEquipmentForm(true);
    };
    const handleDelete = async (dataEquipmentId) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
  
        await axios.delete(
          `http://localhost:3001/api/dequip/delete-equipment/${dataEquipmentId}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        getDataEquipments();
        console.log(`DataEquipment có ID: ${dataEquipmentId} đã được xoá`);
      } catch (error) {
        console.error("Lỗi khi xoá dataEquipment:", error);
      }
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const handleExpandRow = async (dataEquipmentId) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const result = await axios.get(
          `http://localhost:3001/api/dequip/getDetail/${dataEquipmentId}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        setExpandedDataEquipmentInfo(result.data.data);
        setModalVisible(true);
      } catch (error) {
        // console.error("Lỗi", error);
      }
    };

    const getControlEquipments = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        var result;
        if(farmID){result = await axios.get(
          `http://localhost:3001/api/cequip/getAll/${farmID}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );}
        else{result = await axios.get(
          "http://localhost:3001/api/cequip/getAll",
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        }
        setControlEquipments(result.data.data);
      } catch (error) {
        console.error("Lỗi", error);
      }
    };
  

    const handleDelete1 = async (controlEquipmentId) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
  
        await axios.delete(
          `http://localhost:3001/api/cequip/delete-equipment/${controlEquipmentId}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        getControlEquipments();
        console.log(`ControlEquipment có ID: ${controlEquipmentId} đã được xoá`);
      } catch (error) {
        console.error("Lỗi khi xoá controlEquipment:", error);
      }
    };
  

  
    const handleExpandRow1 = async (controlEquipmentId) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const result = await axios.get(
          `http://localhost:3001/api/cequip/getDetail/${controlEquipmentId}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        setExpandedControlEquipmentInfo(result.data.data);
        setModalVisible1(true)
      } catch (error) {
        // console.error("Lỗi", error);
      }
    };
    const column1 = [
        {
            title: "STT",
            align: "center",
            render: (_, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "left",
        },
        {
            title: "Min",
            dataIndex: "min",
            key: "min",
            align: "center",
        },
        {
            title: "Max",
            dataIndex: "max",
            key: "max",
            align: "center",
        },
        {
            title: "MinAction",
            dataIndex: "min_action",
            key: "min_action",
            align: "center",
        },
        {
            title: "MaxAction",
            dataIndex: "max_action",
            key: "max_action",
            align: "center",
        },

        {
            title: "Auto",
            dataIndex: "auto",
            key: "auto",
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
                <Button onClick={() => handleDelete(record._id)}>Xoá</Button>
              </div>
            ),
        },
    ];
    const column2 = [
      {
          title: "STT",
          align: "center",
          render: (_, record, index) => index + 1,
      },
      {
          title: "Name",
          dataIndex: "name",
          key: "name",
          align: "left",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "name",
        align: "center",
      },
      {
          title: "Action",
          key: "action",
          align: "center",
          render: (_, record) => (
            <div>
              <Button type="primary" danger onClick={() => handleOpenModalEdit1(record)}>
                Chỉnh sửa
              </Button>{" "}
              <Button onClick={() => handleDelete1(record._id)}>Xoá</Button>
            </div>
          ),
      },
  ];
  
    return (
      <div className="wrapper">
        <div className="wrapper-content">
          <h4 className="wrapper-content__title">THIẾT BỊ CẢM BIẾN</h4>
  
          <div className="wrapper-content__table">
            <Table
              columns={column1}
              expandable={{
                expandedRowRender: () => null,
                rowExpandable: (result) => result._id === result?._id,
                onExpand: (_, result) => handleExpandRow(result._id),
              }}
              dataSource={dataEquipments}
            />
          </div>
          <div className="wrapper-content__createfarm centered-button">
            {(farmID) && (!showCreateDataEquipmentForm ? (
                <Button type="primary" onClick={handleCreateDataEquipment}>
                  THÊM THIẾT BỊ CẢM BIẾN
                </Button>
              ) : (
                <CreateDataEquipmentForm
                  onUpdateDataEquipment={() => {
                    getDataEquipments();
                    }}
                  visible={showCreateDataEquipmentForm}
                  setVisible={setShowCreateDataEquipmentForm}
                  farmID={farmID}
                />
              )
            )}
          </div>
          <h4 className="wrapper-content__title">THIẾT BỊ ĐIỀU KHIỂN</h4>
          <div className="wrapper-content__table">
            <Table
              columns={column2}
              expandable={{
                expandedRowRender: () => null,
                rowExpandable: (result) => result._id === result?._id,
                onExpand: (_, result) => handleExpandRow1(result._id),
              }}
              dataSource={controlEquipments}
            />
          </div>
          <div className="wrapper-content__createfarm centered-button">
            {(farmID) && (!showCreateControlEquipmentForm ? (
                <Button type="primary" onClick={handleCreateControlEquipment}>
                  THÊM THIẾT BỊ ĐIỀU KHIỂN
                </Button>
              ) : (
                <CreateControlEquipmentForm
                  onUpdateControlEquipment={() => {
                    getControlEquipments();
                    }}
                  visible = {showCreateControlEquipmentForm}
                  setVisible = {setShowCreateControlEquipmentForm}
                  farmID={farmID}
                />
              )
            )}
          </div>

          <Modal
          title="Farm Details"
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {expandedDataEquipmentInfo && (
            <div>
                <p>ID: {expandedDataEquipmentInfo?._id}</p>
                <p>Key: {expandedDataEquipmentInfo?.key}</p>
                <p>Name: {expandedDataEquipmentInfo?.name}</p>
                <p>Farm ID: {expandedDataEquipmentInfo?.farmId}</p>
                <p>Min: {expandedDataEquipmentInfo?.min}</p>
                <p>Max: {expandedDataEquipmentInfo?.max}</p>
                <p>Min_Action: {expandedDataEquipmentInfo?.min_action}</p>
                <p>Max_Action: {expandedDataEquipmentInfo?.max_action}</p>
                <p>Type: {expandedDataEquipmentInfo?.typ}</p>
                <p>Auto: {expandedDataEquipmentInfo?.auto}</p>
                <p>createdAt: {expandedDataEquipmentInfo?.createdAt}</p>
                <p>updatedAt: {expandedDataEquipmentInfo?.updatedAt}</p>
                <p>{expandedDataEquipmentInfo.__v}</p>
            </div>
          )}
          </Modal>
          <Modal
            title="Farm Details"
            open={modalVisible1}
            onCancel={closeModal1}
            footer={null}
          >
            {expandedControlEquipmentInfo && (
              <div>
                  <p>ID: {expandedControlEquipmentInfo?._id}</p>
                  <p>Key: {expandedControlEquipmentInfo?.key}</p>
                  <p>Name: {expandedControlEquipmentInfo?.name}</p>
                  <p>Farm ID: {expandedControlEquipmentInfo?.farmId}</p>
                  <p>Type: {expandedControlEquipmentInfo?.typ}</p>
                  <p>Status: {expandedControlEquipmentInfo?.status}</p>
                  <p>createdAt: {expandedControlEquipmentInfo?.createdAt}</p>
                  <p>updatedAt: {expandedControlEquipmentInfo?.updatedAt}</p>
                  <p>{expandedControlEquipmentInfo.__v}</p>
              </div>
            )}
          </Modal>
        </div>

        <div className="modal-edit">
                <Modal
                    open={openModalEdit}
                    title="Chỉnh sửa thiết bị cảm biến"
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
                            initialValue={selectedDevice?.name}
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
                            label="Key"
                            name="key"
                            initialValue={selectedDevice?.key}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input key!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Typ"
                            name="typ"
                            initialValue={selectedDevice?.typ}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input typ!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Min"
                            name="min"
                            initialValue={selectedDevice?.min}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input min!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Max"
                            name="max"
                            initialValue={selectedDevice?.max}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input max!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Min_Action"
                            name="min_action"
                            initialValue={selectedDevice?.key}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input min action!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Max_Action"
                            name="max_action"
                            initialValue={selectedDevice?.key}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input max action!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Auto"
                            name="auto"
                            initialValue={selectedDevice?.auto}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input auto!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        <div className="modal-edit">
            <Modal
                open={openModalEdit1}
                title="Chỉnh sửa thiết bị điều khiển"
                onCancel={handleCancelEdit1}
                footer={[
                    <Button key="back" onClick={handleCancelEdit1}>
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
                    onFinish={onFinish1}
                    form={form}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        initialValue={selectedDevice1?.name}
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
                        label="Key"
                        name="key"
                        initialValue={selectedDevice1?.key}
                        rules={[
                            {
                                required: true,
                                message: "Please input key!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Typ"
                        name="typ"
                        initialValue={selectedDevice1?.typ}
                        rules={[
                            {
                                required: true,
                                message: "Please input typ!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        initialValue={selectedDevice1?.status}
                        rules={[
                            {
                                required: true,
                                message: "Please input status!",
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
