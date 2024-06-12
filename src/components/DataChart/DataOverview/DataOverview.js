import { useEffect, React, useState } from "react";
import "./style.scss";
import { Table } from "antd";
import axios from "axios";

const initialParameterData = [
    {
        parameter: "Thông số cảm biến độ ẩm không khí hiện tại",
        value: `ĐANG THU THẬP DỮ LIỆU`,
    },
    {
        parameter: "Thông số cảm biến nhiệt độ hiện tại",
        value: `ĐANG THU THẬP DỮ LIỆU`,
    },
];
export default function DataOverview() {
    const [parameterData, setParameterData] = useState(initialParameterData);
    const [firstValue, setFirstValue] = useState("0");
    const [firstValueAir, setFirstValueAir] = useState("0");

    useEffect(() => {
        async function fetchData() {
            try {
                const url =
                    "https://io.adafruit.com/api/v2/minhpham51/feeds/temperature";
                const response = await axios.get(url);
                const sensorData = response.data;

                const newFirstValue = sensorData?.last_value || "0";

                if (newFirstValue !== firstValue) {
                    setFirstValue(newFirstValue);
                }

                const updatedParameterData = [...parameterData];
                updatedParameterData[1].value = `${newFirstValue} °C`;

                setParameterData(updatedParameterData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [firstValue, parameterData]);

    useEffect(() => {
        async function fetchData() {
            try {
                const url =
                    "https://io.adafruit.com/api/v2/minhpham51/feeds/humidity";
                const response = await axios.get(url);
                const sensorData = response.data;

                const newFirstValue = sensorData?.last_value || "0";

                if (newFirstValue !== firstValue) {
                    setFirstValueAir(newFirstValue);
                }

                const updatedParameterData = [...parameterData];
                updatedParameterData[0].value = `${newFirstValue} %`;

                setParameterData(updatedParameterData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [firstValue, firstValueAir, parameterData]);

    const columns = [
        {
            title: "Thông số",
            dataIndex: "parameter",
            key: "parameter",
        },
        {
            title: "Giá trị",
            dataIndex: "value",
            key: "value",
            width: 300,
        },
    ];
    return (
        <div className="wrapper-content">
            <div className="current-parameter">
                <Table dataSource={parameterData} columns={columns} />
            </div>
        </div>
    );
}
