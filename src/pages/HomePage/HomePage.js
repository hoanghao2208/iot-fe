import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { notification } from "antd";
import axios from "axios";

const Context = React.createContext({
    name: "Default",
});

export default function Home() {
    const [api, contextHolder] = notification.useNotification();
    const [noti, setNoti] = useState("");

    const handleGetNoti = useCallback(async () => {
        const url =
            "https://io.adafruit.com/api/v2/minhpham51/feeds/notification";
        try {
            const response = await axios.get(url);
            setNoti(response.data.last_value);
        } catch (error) {
            console.error("Failed to fetch notification:", error);
        }
    }, []);

    useEffect(() => {
        handleGetNoti();
    }, [handleGetNoti]);

    useEffect(() => {
        if (noti) {
            api.info({
                message: "Thông báo",
                description: noti,
                placement: "topRight",
            });
        }
    }, [api, noti]);

    return (
        <Context.Provider value={{ name: "User" }}>
            {contextHolder}
            <div className="container">
                <div className="carousel">
                    <h1>
                        Welcome to IOT<span>farm</span>
                    </h1>
                    <p>Cùng nhau cây dựng nền nông nghiệp thông minh.</p>
                </div>
            </div>
        </Context.Provider>
    );
}
