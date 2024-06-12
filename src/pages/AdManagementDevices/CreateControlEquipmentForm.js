import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import "./index.scss";

export default function CreateControlEquipmentForm({ onUpdateControlEquipment, visible, setVisible , farmID}) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let response = await axios.post(
          `http://localhost:3001/api/cequip/post/${farmID}`,
          values,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
      );
      
      onUpdateControlEquipment();
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
      title="Thêm thiết bị điều khiển"
      onCancel={handleCancel}
      footer={null}
    >
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Input name ..." />
      </Form.Item>
      <Form.Item label="Key" name="key" rules={[{ required: true }]}>
        <Input placeholder="Input key ..." />
      </Form.Item>
      <Form.Item label="Typ" name="typ" rules={[{ required: true }]}>
        <Input placeholder="Input typ ..." />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Input placeholder="Input status ..." />
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
