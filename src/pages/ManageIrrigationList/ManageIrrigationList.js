import { CloseOutlined, HistoryOutlined } from "@ant-design/icons";
import "./style.scss";
import mqtt from "mqtt";
import { useCallback, useEffect } from "react";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

let client;

const ManageIrrigationList = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const navigate = useNavigate();

    useEffect(() => {
        client = mqtt.connect("wss://io.adafruit.com", {
            port: 443,
            username: "minhpham51",
            password: "aio_ZjRP62bxbuOx6EwioYkagIbWdygC",
        });

        client.on("connect", () => {
            console.log("Connected to Adafruit IO");
        });
    }, []);

    const handleDelete = useCallback(() => {
        const deleted = {
            action: "delete",
            id: parseInt(data.id),
        };
        const message = JSON.stringify(deleted);

        client.publish("minhpham51/feeds/irrigation", message, (error) => {
            if (error) {
                console.error("Publish error: ", error);
            } else {
                console.log("Message published successfully");
                Message.sendSuccess("Xóa thành công");
                localStorage.removeItem("data");
                window.location.reload();
            }
        });
    }, [data.id]);

    return (
        <div className="manage-wrapper">
            <h3>{data?.schedulerName || ""}</h3>
            <span>ID: {data?.id || ""}</span>
            <div>
                <span onClick={() => navigate("/update-manage-irrigation")}>
                    <HistoryOutlined />
                </span>
                <span onClick={handleDelete}>
                    <CloseOutlined />
                </span>
            </div>
        </div>
    );
};

export default ManageIrrigationList;
