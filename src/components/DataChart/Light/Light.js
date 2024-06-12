import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import { http } from "../../../utils/http";
import * as echarts from "echarts";
import { Table } from "antd";
import { message } from "antd";

export default function Light() {
  const chartRef = useRef(null);
  const secondChartRef = useRef(null);
  const [lightData, setLightData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  //convert date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 7);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleDateString("vi-VN", options).replace(",", " ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.apiV4.get("v4/data");
        const dataWithSequence = response.data.map((item, index) => ({
          ...item,
          sequence: index + 1,
          created_at_formatted: formatDate(item.created_at),
        }));
        setLightData(dataWithSequence);

        const firstValue =
          dataWithSequence.length > 0 ? dataWithSequence[0].value : 0;
        // onFirstValueChange(firstValue);

        const maxLight = localStorage.getItem("maxLight");
        const minLight = localStorage.getItem("minLight");
        if (maxLight && parseFloat(firstValue) > parseFloat(maxLight)) {
          message.warning("Ánh sáng đang vượt quá ngưỡng an toàn!", [2]);
        }
        if (minLight && parseFloat(firstValue) < parseFloat(minLight)) {
          message.warning("Ánh sáng đang thấp hơn ngưỡng an toàn!", [2]);
        }

        //chart 1
        const gaugeOptions = {
          series: [
            {
              type: "gauge",
              center: ["50%", "60%"],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              splitNumber: 10,
              itemStyle: {
                color: "#FFe388",
              },
              progress: {
                show: true,
                width: 30,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  width: 30,
                },
              },
              axisTick: {
                distance: -45,
                splitNumber: 5,
                lineStyle: {
                  width: 2,
                  color: "#999",
                },
              },
              splitLine: {
                distance: -52,
                length: 14,
                lineStyle: {
                  width: 3,
                  color: "#999",
                },
              },
              axisLabel: {
                distance: -10,
                color: "#999",
                fontSize: 15,
              },
              anchor: {
                show: false,
              },
              title: {
                show: false,
              },
              detail: {
                valueAnimation: true,
                width: "60%",
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, "-15%"],
                fontSize: 60,
                fontWeight: "bolder",
                formatter: "{value}",
                color: "inherit",
              },
              data: [{ value: firstValue }],
            },
            {
              type: "gauge",
              center: ["50%", "60%"],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              itemStyle: {
                color: "#f4bc1c",
              },
              progress: {
                show: true,
                width: 8,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              detail: {
                show: false,
              },
              data: [
                {
                  value: firstValue,
                  name: "Ánh sáng hiện tại",
                },
              ],
            },
          ],
          backgroundColor: "#100c2a",
        };
        const lightData = response.data.map((item) => ({
          date: item.created_at,
          light: item.value,
        }));

        // chart 2
        const secondChart = echarts.init(secondChartRef.current);

        const dates = dataWithSequence.map((item) => item.created_at_formatted);
        const values = lightData.map((item) => item.light);

        const reversedDates = dates.slice().reverse();
        const reversedValesAir = values.slice().reverse();

        const secondChartOptions = {
          title: {
            left: "1%",
            textStyle: {
              color: "#fff",
            },
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            textStyle: {
              color: "#fff",
            },
          },
          xAxis: {
            type: "category",
            data: reversedDates,
            axisLine: {
              lineStyle: {
                color: "#ccc",
              },
            },
            axisLabel: {
              color: "#ccc",
            },
          },
          yAxis: {
            type: "value",
            min: 0,
            max: 100,
            axisLine: {
              lineStyle: {
                color: "#B9B8CE",
              },
            },
            axisLabel: {
              color: "#B9B8CE",
            },
          },
          dataZoom: [
            {
              type: "inside",
              start: 0,
              end: 100,
            },
            {
              start: 0,
              end: 100,
              handleSize: "80%",
              handleStyle: {
                color: "#fff",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 0.6)",
                shadowOffsetX: 2,
                shadowOffsetY: 2,
              },
            },
          ],
          series: [
            {
              name: "Nhiệt độ",
              color: "#FBDB0F",
              type: "line",
              data: reversedValesAir,
              markLine: {
                silent: true,
                lineStyle: {
                  color: "#B3B3B3",
                },
                data: [
                  { yAxis: 20 },
                  { yAxis: 40 },
                  { yAxis: 60 },
                  { yAxis: 80 },
                  { yAxis: 100 },
                ],
              },
            },
          ],
          backgroundColor: "#100c2a",
        };
        secondChart.setOption(secondChartOptions);

        const chart = echarts.init(chartRef.current);
        chart.setOption(gaugeOptions);

        return () => {
          chart.dispose();
          secondChart.dispose();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //fetchdata
    fetchData();
    const intervalId = setInterval(fetchData, 6000);
    return () => clearInterval(intervalId);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lightData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-dataLight">
      <div className="dataLight-chart">
        <div className="dataLight-chart-title">
          <p>BIỂU ĐỒ DỮ LIỆU CỦA CẢM BIẾN ÁNH SÁNG</p>
        </div>
        <div className="dataLight-chart-detail" ref={chartRef}></div>
        <div className="dataLight-chart-detail" ref={secondChartRef}></div>
      </div>
      <div className="dataLight-table">
        <div className="dataLight-table-title">
          <p>BẢNG SỐ LIỆU DỮ LIỆU THÔ CỦA CẢM BIẾN ÁNH SÁNG</p>
        </div>

        <div className="dataLight-table-detail">
          <Table
            dataSource={currentItems}
            pagination={{
              pageSize: itemsPerPage,
              total: lightData.length,
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
            }}
            scroll={{ y: 700 }}
          >
            <Table.Column
              title="STT"
              dataIndex="sequence"
              key="sequence"
              className="dataLight-title-detail"
              width={80}
            />
            <Table.Column
              title="Mã"
              dataIndex="id"
              key="id"
              className="dataLight-title-detail"
              width={400}
            />
            <Table.Column
              title="Ánh Sáng (%)"
              dataIndex="value"
              key="value"
              className="dataLight-title-detail"
            />
            <Table.Column
              title="Thời Gian Cập Nhật"
              dataIndex="created_at_formatted"
              key="created_at_formatted"
              className="dataLight-title-detail created-at"
            />
            <Table.Column
              title="Thiết Bị"
              dataIndex="feed_key"
              key="feed_key"
              className="dataLight-title-detail"
              width={150}
            />
          </Table>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
