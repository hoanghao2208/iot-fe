import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import { http } from "../../../utils/http";
import * as echarts from "echarts";
import { Table } from "antd";
import { message } from "antd";

export default function Air() {
  const chartRef = useRef(null);
  const secondChartRef = useRef(null);
  const [airData, setAirData] = useState([]);
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
        const response = await http.apiV1.get("v2/data");
        const dataWithSequence = response.data.map((item, index) => ({
          ...item,
          sequence: index + 1,
          created_at_formatted: formatDate(item.created_at),
        }));
        setAirData(dataWithSequence);

        const firstValueAir =
          dataWithSequence.length > 0 ? dataWithSequence[0].value : 0;
        // onFirstValueChangeAir(firstValueAir);
        const maxAir = localStorage.getItem("maxAir");
        const minAir = localStorage.getItem("minAir");
        if (maxAir && parseFloat(firstValueAir) > parseFloat(maxAir)) {
          message.warning("Độ ẩm không khí đang vượt quá ngưỡng an toàn!", [2]);
        }
        if (minAir && parseFloat(firstValueAir) < parseFloat(minAir)) {
          message.warning("Độ ẩm không khí đang thấp hơn ngưỡng an toàn!", [2]);
        }

        const gaugeOptions = {
          series: [
            {
              type: "gauge",
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 100,
              splitNumber: 10,
              itemStyle: {
                color: "#58D9F9",
                shadowColor: "rgba(0,138,255,0.45)",
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
              },
              progress: {
                show: true,
                roundCap: true,
                width: 18,
              },
              pointer: {
                icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
                length: "75%",
                width: 16,
                offsetCenter: [0, "5%"],
              },
              axisLine: {
                roundCap: true,
                lineStyle: {
                  width: 18,
                },
              },
              axisTick: {
                splitNumber: 2,
                lineStyle: {
                  width: 2,
                  color: "#999",
                },
              },
              splitLine: {
                length: 12,
                lineStyle: {
                  width: 3,
                  color: "#999",
                },
              },
              axisLabel: {
                distance: 20,
                color: "#999",
                fontSize: 15,
              },
              title: {
                show: false,
              },
              detail: {
                backgroundColor: "#fff",
                borderColor: "#999",
                borderWidth: 2,
                width: "110%",
                lineHeight: 40,
                height: 40,
                borderRadius: 8,
                offsetCenter: [0, "35%"],
                valueAnimation: true,
                formatter: function (value) {
                  return "{value|" + value.toFixed(1) + "}{unit|%}";
                },
                rich: {
                  value: {
                    fontSize: 40,
                    fontWeight: "bolder",
                    color: "#777",
                  },
                  unit: {
                    fontSize: 20,
                    color: "#999",
                    padding: [0, 0, -20, 10],
                  },
                },
              },
              data: [{ value: firstValueAir }],
            },
          ],
          backgroundColor: "#100c2a",
        };
        const airData = response.data.map((item) => ({
          date: item.created_at,
          air: item.value,
        }));

        // chart 2
        const secondChart = echarts.init(secondChartRef.current);

        const dates = dataWithSequence.map((item) => item.created_at_formatted);
        const values = airData.map((item) => item.air);
        // console.log(values);

        const reversedDates = dates.slice().reverse();
        const reversedValesAir = values.slice().reverse();
        // console.log(reversedDates);

        const secondChartOptions = {
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: reversedDates,
          },
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            textStyle: {
              color: "#fff",
            },
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: reversedValesAir,
              name: "Độ ẩm",
              type: "line",
              areaStyle: {},
            },
          ],
          backgroundColor: "#100c2a",
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

    fetchData();
    const intervalId = setInterval(fetchData, 6000);
    return () => clearInterval(intervalId);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = airData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container-dataAir">
      <div className="dataAir-chart">
        <div className="dataTemp-chart-title">
          <p>BIỂU ĐỒ DỮ LIỆU CỦA CẢM BIẾN ĐỘ ẨM KHỘNG KHÍ</p>
        </div>

        <div className="dataAir-chart-detail" ref={chartRef}></div>
        <div className="dataAir-chart-detail" ref={secondChartRef}></div>
      </div>
      <div className="dataAir-table">
        <div className="dataTemp-table-title">
          <p>BẢNG SỐ LIỆU DỮ LIỆU THÔ CỦA CẢM BIẾN ĐỘ ẨM KHỘNG KHÍ</p>
        </div>

        <div className="dataAir-table-detail">
          <Table
            dataSource={currentItems}
            pagination={{
              pageSize: itemsPerPage,
              total: airData.length,
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
            }}
            className="dataAir-table-detail-record-table"
            scroll={{ y: 700 }}
          >
            <Table.Column
              title="STT"
              dataIndex="sequence"
              key="sequence"
              className="dataAir-title-detail"
              width={80}
            />
            <Table.Column
              title="Mã"
              dataIndex="id"
              key="id"
              className="dataAir-title-detail"
              width={400}
            />
            <Table.Column
              title="Độ Ẩm Không Khí (%)"
              dataIndex="value"
              key="value"
              className="dataAir-title-detail"
            />
            <Table.Column
              title="Thời Gian Cập Nhật"
              dataIndex="created_at_formatted"
              key="created_at_formatted"
              className="dataAir-title-detail created-at"
            />
            <Table.Column
              title="Thiết Bị"
              dataIndex="feed_key"
              key="feed_key"
              className="dataAir-title-detail"
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
