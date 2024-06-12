import { Button, Form, Input, InputNumber, Select, TimePicker } from "antd";
import "./style.scss";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import mqtt from "mqtt";
import Message from "../../components/Message";

let client;

const ManageIrrigation = () => {
    const [form] = Form.useForm();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const onChangeStartTime = (_, timeString) => {
        setStartTime(timeString);
    };

    const onChangeEndTime = (_, timeString) => {
        setEndTime(timeString);
    };

    useEffect(() => {
        client = mqtt.connect("wss://io.adafruit.com", {
            port: 443,
            username: "minhpham51",
            password: "aio_EkSE203XLYsi8LMpVKyRomhKN7Mr",
        });

        client.on("connect", () => {
            console.log("Connected to Adafruit IO");
        });
    }, []);

    const handleFinish = useCallback(
        (values) => {
            const data = {
                action: "create",
                id: parseInt(values.id),
                cycle: values.cycle,
                flow1: parseInt(values.flow1),
                flow2: parseInt(values.flow2),
                flow3: parseInt(values.flow3),
                pumpIn: parseInt(values.pumpIn),
                area: parseInt(values.area),
                isActive: 1,
                schedulerName: values.schedulerName,
                startTime,
                stopTime: endTime,
            };

            const message = JSON.stringify(data);
            client.publish("minhpham51/feeds/irrigation", message, (error) => {
                if (error) {
                    console.error("Publish error: ", error);
                } else {
                    console.log("Message published successfully");
                    form.resetFields();
                    Message.sendSuccess("Tạo mới thành công");
                }
            });
        },
        [endTime, form, startTime]
    );

    return (
        <div className="wrapper-irrigation">
            <h2>Thêm mới hoạt động tưới tiêu</h2>
            <div className="manage-irrigation">
                <Form
                    form={form}
                    name="manage-irrigation"
                    layout="vertical"
                    onFinish={handleFinish}
                    autoComplete="off"
                >
                    <div className="manage-irrigation--row">
                        <Form.Item
                            label="Tên hoạt động"
                            name="schedulerName"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên hoạt động",
                                },
                            ]}
                        >
                            <Input placeholder="Tên hoạt động" />
                        </Form.Item>
                        <Form.Item
                            label="ID"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập ID",
                                },
                            ]}
                        >
                            <Input placeholder="ID" />
                        </Form.Item>
                        <Form.Item
                            label="Vòng lặp"
                            name="cycle"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập vòng lặp",
                                },
                            ]}
                        >
                            <InputNumber min={0} placeholder="Vòng lặp" />
                        </Form.Item>
                    </div>
                    <div className="manage-irrigation--row">
                        <Form.Item
                            label="Dung dịch phân bể 1"
                            name="flow1"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập dung dịch phân bể",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Dung dịch phân bể 1"
                                addonAfter="ml"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dung dịch phân bể 2"
                            name="flow2"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập dung dịch phân bể",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Dung dịch phân bể 2"
                                addonAfter="ml"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dung dịch phân bể 3"
                            name="flow3"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập dung dịch phân bể",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Dung dịch phân bể 3"
                                addonAfter="ml"
                            />
                        </Form.Item>
                    </div>
                    <div className="manage-irrigation--row">
                        <Form.Item
                            label="Khu vực"
                            name="area"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn khu vực",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Khu vực"
                                options={[
                                    { value: "1", label: "Khu vực 1" },
                                    { value: "2", label: "Khu vực 2" },
                                    { value: "3", label: "Khu vực 3" },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Lượng nước bơm vào"
                            name="pumpIn"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập lượng nước bơm vào",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Lượng nước bơm vào"
                                addonAfter="ml"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Thời gian bắt đầu"
                            name="startTime"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn thời gian bắt đầu",
                                },
                            ]}
                        >
                            <TimePicker
                                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                                placeholder="Thời gian bắt đầu"
                                onChange={onChangeStartTime}
                            />
                        </Form.Item>
                    </div>
                    <div className="manage-irrigation--row">
                        <Form.Item
                            label="Thời gian kết thúc"
                            name="stopTime"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn thời gian kết thúc",
                                },
                            ]}
                        >
                            <TimePicker
                                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                                placeholder="Thời gian kết thúc"
                                onChange={onChangeEndTime}
                            />
                        </Form.Item>
                    </div>
                    <div className="submit-btn">
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            htmlType="submit"
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ManageIrrigation;
