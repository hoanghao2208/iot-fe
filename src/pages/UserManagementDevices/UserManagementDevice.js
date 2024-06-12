import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Space,
  ConfigProvider,
  Switch,
  Modal,
  InputNumber,
} from "antd";
import { http } from "../../utils/http";
import Message from "../../components/Message";
import "./style.scss";
import axios from "axios";
import { message } from "antd";

const data2 = [
  {
    id: "V10",
    name: "Máy Bơm Nước",
  },
  {
    id: "V11",
    image: "../../assets/images/",
    name: "Đèn LED",
  },
];

export default function UserManagementDevice() {
  const [defarm, setDEFarm] = useState([]);

  const [latestTemperature, setLatestTemperature] = useState(null);
  const [latestLight, setLatestLight] = useState(null);
  const [latestLand, setLatestLand] = useState(null);
  const [latestAir, setLatestAir] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSensorId, setSelectedSensorId] = useState(null);
  const [editedMaxValue, setEditedMaxValue] = useState(null);
  const [editedMinValue, setEditedMinValue] = useState(null);
  // const navigates = useNavigate();

  useEffect(() => {
    getDEFarm();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (defarm.length > 0) {
        fetchLatestTemperature();
        fetchLatestLight();
        fetchLatestLand();
        fetchLatestAir();
      }
    }, 8000); // Gọi hàm fetchLatestTemperature() mỗi 5 giây (5000 milliseconds)

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [defarm]); // Chạy useEffect khi defarm thay đổi

  const getDEFarm = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const result = await axios.get(
        "http://localhost:3001/api/dequip/getAll/655dccbc7980eebb836b6d84",
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      setDEFarm(result.data.data);

      const maxTemperature = result.data.data.find(
        (item) => item.typ === "V1"
      ).max_action;
      localStorage.setItem("maxTemperature", maxTemperature);
      const minTemperature = result.data.data.find(
        (item) => item.typ === "V1"
      ).min_action;
      localStorage.setItem("minTemperature", minTemperature);

      const maxLight = result.data.data.find(
        (item) => item.typ === "V4"
      ).max_action;
      localStorage.setItem("maxLight", maxLight);
      const minLight = result.data.data.find(
        (item) => item.typ === "V4"
      ).min_action;
      localStorage.setItem("minLight", minLight);

      const maxLand = result.data.data.find(
        (item) => item.typ === "V3"
      ).max_action;
      localStorage.setItem("maxLand", maxLand);
      const minLand = result.data.data.find(
        (item) => item.typ === "V3"
      ).min_action;
      localStorage.setItem("minLand", minLand);

      const maxAir = result.data.data.find(
        (item) => item.typ === "V2"
      ).max_action;
      localStorage.setItem("maxAir", maxAir);
      const minAir = result.data.data.find(
        (item) => item.typ === "V2"
      ).min_action;
      localStorage.setItem("minAir", minAir);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const fetchLatestTemperature = async () => {
    try {
      const response = await axios.get(
        "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v1/data/last",
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": "aio_YDPF29p5ELZDp61YeCDeiXwOvjUh",
          },
        }
      );
      const latestData = response.data;

      const currentTemperature = parseFloat(latestData.value);
      const maxTemperature = localStorage.getItem("maxTemperature");
      const minTemperature = localStorage.getItem("minTemperature");

      if (
        !isNaN(currentTemperature) &&
        currentTemperature > parseFloat(maxTemperature)
      ) {
        message.warning("Nhiệt độ đang vượt quá ngưỡng an toàn!", [2]);
      }

      if (
        !isNaN(currentTemperature) &&
        currentTemperature < parseFloat(minTemperature)
      ) {
        message.warning("Nhiệt độ đang thấp hơn ngưỡng an toàn!", [2]);
      }

      setLatestTemperature(currentTemperature);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const fetchLatestLight = async () => {
    try {
      const response = await axios.get(
        "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v4/data/last",
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": "aio_YDPF29p5ELZDp61YeCDeiXwOvjUh",
          },
        }
      );
      const latestData = response.data;

      const currentLight = parseFloat(latestData.value);
      const maxLight = localStorage.getItem("maxLight");
      const minLight = localStorage.getItem("minLight");

      if (!isNaN(currentLight) && currentLight > parseFloat(maxLight)) {
        message.warning("Ánh sáng đang vượt quá ngưỡng an toàn!", [2]);
      }

      if (!isNaN(currentLight) && currentLight < parseFloat(minLight)) {
        message.warning("Ánh sáng đang thấp hơn ngưỡng an toàn!", [2]);
      }

      setLatestLight(currentLight);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const fetchLatestLand = async () => {
    try {
      const response = await axios.get(
        "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v3/data/last",
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": "aio_YDPF29p5ELZDp61YeCDeiXwOvjUh",
          },
        }
      );
      const latestData = response.data;

      const currentLand = parseFloat(latestData.value);
      const maxLand = localStorage.getItem("maxLand");
      const minLand = localStorage.getItem("minLand");

      if (!isNaN(currentLand) && currentLand > parseFloat(maxLand)) {
        message.warning("Độ ẩm đất đang vượt quá ngưỡng an toàn!", [2]);
      }

      if (!isNaN(currentLand) && currentLand < parseFloat(minLand)) {
        message.warning("Độ ẩm đất đang thấp hơn ngưỡng an toàn!", [2]);
      }

      setLatestLand(currentLand);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const fetchLatestAir = async () => {
    try {
      const response = await axios.get(
        "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v2/data/last",
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": "aio_YDPF29p5ELZDp61YeCDeiXwOvjUh",
          },
        }
      );
      const latestData = response.data;

      const currentAir = parseFloat(latestData.value);
      const maxAir = localStorage.getItem("maxAir");
      const minAir = localStorage.getItem("minAir");

      if (!isNaN(currentAir) && currentAir > parseFloat(maxAir)) {
        message.warning("Độ ẩm không khí đang vượt quá ngưỡng an toàn!", [2]);
      }

      if (!isNaN(currentAir) && currentAir < parseFloat(minAir)) {
        message.warning("Độ ẩm không khí đang thấp hơn ngưỡng an toàn!", [2]);
      }

      setLatestAir(currentAir);
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  const handleOk = async () => {
    try {
      if (editedMaxValue <= editedMinValue) {
        Message.sendError("Giá trị Max Action phải lớn Min Action", [2]);
        return; // Dừng việc cập nhật nếu có lỗi
      }
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:3001/api/dequip/update-equipment/${selectedSensorId}`,
        { max_action: editedMaxValue, min_action: editedMinValue },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Cập nhật thành công:", response.data);
      Message.sendSuccess("Cập nhật ngưỡng thành công", [3]);
      setIsModalVisible(false);
      getDEFarm(); // Lấy lại dữ liệu sau khi cập nhật thành công
    } catch (error) {
      //   console.error("Lỗi khi cập nhật giá trị max:", error);
      Message.sendError("Cập nhật ngưỡng thất bại", [3]);
      // Xử lý lỗi nếu có
    }
  };

  const handleEditMax = (record) => {
    setIsModalVisible(true);
    setSelectedSensorId(record._id);
    setEditedMaxValue(record.max_action);
    setEditedMinValue(record.min_action);
  };

  const columns1 = [
    {
      title: "TYPE",
      dataIndex: "typ",
      width: 120,
      key: "id",
      align: "center",
    },
    // {
    //     title: "Image",
    //     dataIndex: "image",
    //     width: 200,
    //     key: "image",
    //     align: "center",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      align: "left",
    },
    {
      title: "Min",
      dataIndex: "min",
      width: 80,
      key: "min",
      align: "center",
    },
    {
      title: "Max",
      dataIndex: "max",
      width: 80,
      key: "max",
      align: "center",
    },
    {
      title: "MinAction",
      dataIndex: "min_action",
      width: 80,
      key: "min_action",
      align: "center",
    },
    {
      title: "MaxAction",
      dataIndex: "max_action",
      width: 80,
      key: "max_action",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 300,
      align: "center",
      render: (record) => (
        <Space>
          <Button type="primary" danger onClick={() => handleEditMax(record)}>
            CHANGE
          </Button>
          {record.typ === "V1" && (
            <Button
              type="primary"
              onClick={() => navigate("/statistical/temperature")}
            >
              COLLECT
            </Button>
          )}
          {record.typ === "V4" && (
            <Button
              type="primary"
              onClick={() => navigate("/statistical/light")}
            >
              COLLECT
            </Button>
          )}
          {record.typ === "V3" && (
            <Button
              type="primary"
              onClick={() => navigate("/statistical/land")}
            >
              COLLECT
            </Button>
          )}
          {record.typ === "V2" && (
            <Button type="primary" onClick={() => navigate("/statistical/air")}>
              COLLECT
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const columns2 = [
    {
      title: "ID",
      dataIndex: "id",
      width: 120,
      key: "id",
      align: "center",
    },
    // {
    //     title: "Image",
    //     dataIndex: "image",
    //     width: 200,
    //     key: "image",
    //     align: "center",
    //     dataIndex: "ImageURL", // this is the value that is parsed from the DB / server side
    //     render: (theImageURL) => (
    //         <img alt={theImageURL} src={theImageURL} />
    //     ),
    // },
    {
      title: "Name",
      dataIndex: "name",
      width: 250,
      key: "name",
      align: "left",
    },
    {
      title: "Action",
      key: "action",
      width: 680,
      align: "center",
      render: (record) => (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#E0B415",
              colorBgContainer: "#ffffff",
            },
          }}
        >
          <Space direction="horizontal">
            {/* <Button>CHANGE</Button> */}
            {record.id === "V10" ? (
              <Switch
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
                checked={pumpState === 1}
                onChange={() => togglePump(record)}
              />
            ) : record.id === "V11" ? (
              <Switch
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
                checked={ledState === 1}
                onChange={() => toggleLed(record)}
              />
            ) : null}
          </Space>
        </ConfigProvider>
      ),
    },
  ];
  const navigate = useNavigate();
  const [pumpState, setPumpState] = useState(0);
  const [ledState, setLedState] = useState(0);

  const togglePump = (record) => {
    setPumpState(record.id === "V10" ? 1 - pumpState : pumpState === 1 ? 0 : 1);
    sendPumpStateToServer(
      record.id === "V10" ? 1 - pumpState : pumpState === 1 ? 0 : 1
    );
  };

  const toggleLed = (record) => {
    setLedState(record.id === "V11" ? 1 - ledState : ledState === 1 ? 0 : 1);
    sendLedStateToServer(
      record.id === "V11" ? 1 - ledState : ledState === 1 ? 0 : 1
    );
  };

  const sendPumpStateToServer = (value) => {
    http.apiV10
      .post("", { value })
      .then((response) => {
        Message.sendSuccess("MÁY BƠM ĐÃ ĐƯỢC " + (value === 1 ? "BẬT" : "TẮT"));
      })
      .catch((error) => {
        Message.sendError("Failed to update pump state");
        console.error(error);
      });
  };

  const sendLedStateToServer = (value) => {
    http.apiV11
      .post("", { value })
      .then((response) => {
        Message.sendSuccess("ĐÈN LED ĐÃ ĐƯỢC " + (value === 1 ? "BẬT" : "TẮT"));
      })
      .catch((error) => {
        Message.sendError("Failed to update LED state");
        console.error(error);
      });
  };

  return (
    <div className="wrapper1">
      <div className="wrapper-content">
        <div className="wrapper-content__top">
          <h4 className="wrapper-content__title">THIẾT BỊ CẢM BIẾN</h4>
          <div className="wrapper-content__table">
            <Table columns={columns1} dataSource={defarm} />
          </div>
        </div>
        <div className="wrapper-content__bottom">
          <h4 className="wrapper-content__title">THIẾT BỊ ĐIỀU KHIỂN</h4>
          <div className="wrapper-content__table">
            <Table columns={columns2} dataSource={data2} />
          </div>
        </div>
      </div>
      <Modal
        title="Cập nhật ngưỡng thiết bị"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <div
          style={{
            marginBottom: "10px",
            marginTop: "20px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <label>Giá trị Max Action </label>
          <InputNumber
            value={editedMaxValue}
            onChange={(value) => setEditedMaxValue(value)}
            style={{ width: "40%" }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <label>Giá trị Min Action </label>
          <InputNumber
            value={editedMinValue}
            onChange={(value) => setEditedMinValue(value)}
            style={{ width: "40%" }}
          />
        </div>
      </Modal>
    </div>
  );
}
