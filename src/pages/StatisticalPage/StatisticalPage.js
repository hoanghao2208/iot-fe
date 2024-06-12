import { React, useState, useEffect } from "react";
import "./style.scss";
import { Tabs } from "antd";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Temperature from "../../components/DataChart/Temperature";
import Air from "../../components/DataChart/Air";
import Land from "../../components/DataChart/Land";
import Light from "../../components/DataChart/Light";
import DataOverview from "../../components/DataChart/DataOverview";
const { TabPane } = Tabs;

export default function StatisticalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("0");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/temperature")) {
      setActiveTab("1");
    } else if (path.includes("/air")) {
      setActiveTab("3");
    } else if (path.includes("/land")) {
      setActiveTab("2");
    } else if (path.includes("/light")) {
      setActiveTab("4");
    } else {
      setActiveTab("0");
    }
  }, [location]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    if (value === "0") {
      navigate("/statistical/*");
      setActiveTab("0");
    }
    if (value === "1") {
      navigate("/statistical/temperature");
      setActiveTab("1");
    }
    if (value === "2") {
      navigate("/statistical/land");
      setActiveTab("2");
    }
    if (value === "3") {
      navigate("/statistical/air");
      setActiveTab("3");
    }
    if (value === "4") {
      navigate("/statistical/light");
      setActiveTab("4");
    }
  };
  return (
    <div className="container-StatisticalPage">
      <div className="wrapper-content">
        <div className="current-chart">
          <Tabs
            // defaultActiveKey="0"
            activeKey={activeTab}
            onChange={handleChange}
            tabBarStyle={{
              background: "#f0f0f0",
              padding: "13px",
              backgroundColor: "white",
            }}
          >
            <TabPane tab="DỮ LIỆU CẢM BIẾN HIỆN TẠI" key="0"></TabPane>
            <TabPane tab="NHIỆT ĐỘ" key="1"></TabPane>
            <TabPane tab="ÁNH SÁNG" key="4"></TabPane>
            <TabPane tab="ĐỘ ẨM ĐẤT" key="2"></TabPane>
            <TabPane tab="ĐỘ ẨM KHÔNG KHÍ" key="3"></TabPane>
          </Tabs>
        </div>
        <Routes>
          <Route path="temperature" element={<Temperature />} />
          <Route path="air" element={<Air />} />
          <Route path="land" element={<Land />} />
          <Route path="light" element={<Light />} />
          <Route path="*" element={<DataOverview />} />
        </Routes>
      </div>
    </div>
  );
}
