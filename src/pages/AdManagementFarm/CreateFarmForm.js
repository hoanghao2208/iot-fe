import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import "./style.scss";

export default function CreateFarmForm({ onCreateFarm, visible, setVisible}) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let response = await axios.post(
        "http://localhost:3001/api/admin/createFarm",
        values,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log(response.data);
      onCreateFarm();
      setVisible(false);
      form.resetFields();
    } catch (error) {
      // console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      title="Thêm Nông trại"
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Tên Nông Trại" name="name" rules={[{ required: true }]}>
          <Input placeholder="Nhập tên nông trại" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true }]}>
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        {/* <Form.Item label="Ảnh" name="image" rules={[{ required: true }]}>
          <Input placeholder="Nhập link ảnh" />
        </Form.Item> */}
        <Form.Item label="Mô tả" name="description" rules={[{ required: true }]}>
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <div className="centered-button">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>{" "}
            <Button danger onClick={handleCancel}>
              Huỷ
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
