import { Alert } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./style.scss";

const Notification = () => {
    const [noti, setNoti] = useState("");

    const handleGetNoti = useCallback(async () => {
        const url =
            "https://io.adafruit.com/api/v2/minhpham51/feeds/notification";
        const response = await axios.get(url);
        setNoti(response.data.last_value);
    }, []);

    useEffect(() => {
        handleGetNoti();
    }, [handleGetNoti]);

    return (
        <div className="noti-wrapper">
            <Alert
                message="Thông báo"
                description={noti}
                type="info"
                showIcon
            />
        </div>
    );
};

export default Notification;
