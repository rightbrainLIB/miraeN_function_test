import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Divider, Chip } from "@mui/material";
import { Line } from "react-chartjs-2";

import {
  CircularProgress,
  Typography,
  Stack,
  circularProgressClasses,
} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "transparent",
        drawTicks: true,
        tickLength: 3,
        tickColor: "#000",
        // tickBorderDash: [5, 5],
        drawOnChartArea: true,
      },
      ticks: {
        padding: 10,
        // callback: function (value: number | string) {
        //   const marker =
        //     '<div style="display: inline-block; width: 20px; height: 20px; background-color: red; margin-right: 5px;"></div>';
        //   return marker + value;
        // },
      },
      border: {
        display: true,
        color: "#f0f0f0",
      },
    },
    y: {
      min: 0,
      max: 100,
      grid: {
        display: true,
        drawTicks: false,
        // tickLength: 100,
        // tickColor: "#000",
        // tickBorderDash: [5, 5],
        // drawOnChartArea: true,
      },

      ticks: {
        beginAtZero: true,
        stepSize: 25,
        padding: 10,
      },
      border: {
        display: false,
        dash: [2, 2],
      },
    },
  },
};

const labels = ["5", "15", "25", "5", "15", "25"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Blue",
      data: [75, 50, 80, 56, 78, 90],
      backgroundColor: "#1976d2",
      borderColor: "#1976d2",
      borderWidth: 1,
      pointRadius: 5,
    },
  ],
};

function T2() {
  const [progress, setProgress] = useState(0);
  const percentage = 75;
  const duration = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= percentage) {
          clearInterval(interval);
          return percentage;
        } else {
          return prevProgress + 1;
        }
      });
    }, duration / percentage);

    return () => {
      clearInterval(interval);
    };
  }, [percentage, duration]);

  return (
    <>
      <h2>선생님 수업하기</h2>
      <table className="info">
        <tbody>
          <tr>
            <th>mui지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>-</td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>-</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>프로토파이 형태의 애니메이션 불가</td>
          </tr>
        </tbody>
      </table>
      <Stack sx={{ width: "100px", margin: 5, position: "relative" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={100}
          thickness={5}
          style={{ color: "#f0f0f0", position: "relative" }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={100}
          thickness={5}
          sx={{
            position: "absolute",
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
              backgroundColor: "#f0f0f0",
            },
          }}
        />
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-15px",
            marginLeft: "-17px",
            fontWeight: "bold",
          }}
        >{`${progress}%`}</Typography>
      </Stack>
      <table className="info">
        <tbody>
          <tr>
            <th>chartjs 지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>-</td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>x ticks 부분 marker</td>
          </tr>
          <tr>
            <th>확인필요</th>
            <td>평균부분 html 추가한 부분이라 접근성 관련 확인필요</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>
              프로토파이 형태의 애니메이션 불가, 평균라인 불가(별로도
              추가해야함), x축 label 위 marker 디자인대로 불가
            </td>
          </tr>
        </tbody>
      </table>
      <Stack
        sx={{
          width: "500px",
          margin: 5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Line options={options} data={data} />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "1px",
            top: "41%",
            left: 0,
            marginTop: "-10px",
            opacity: 0,
            animation: "slideInFromBottom 0.5s 0.5s forwards",
            "@keyframes slideInFromBottom": {
              from: {
                transform: "translateY(100px)",
                opacity: 1,
              },
              to: {
                transform: "translateY(0)",
                opacity: 1,
              },
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Divider
              sx={{
                position: "relative",
                borderColor: "#b1afaf",
                borderStyle: "dashed",
                opacity: 0,
                width: "96%",
                left: "0",
                overflow: "visible",
                animation: "fadeIn 0.8s 0.5s forwards",
                "@keyframes fadeIn": {
                  "0%": {
                    transform: " translateX(-200%)",
                    opacity: 0,
                  },
                  "20%,30%": {
                    transform: " translateX(-100%)",
                    opacity: 1,
                  },
                  "100%": {
                    transform: " translateX(0)",
                    opacity: 1,
                  },
                },
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  right: "-3px",
                  width: 0,
                  height: 0,
                  borderTop: "4px solid transparent",
                  borderBottom: "4px solid transparent",
                  borderRight: "4px solid #b1afaf",
                  transform: "translate(-50%, -50%) rotate(180deg)",
                  zIndex: 1,
                },
              }}
            />
          </Box>
          <Chip
            label="평균"
            sx={{
              position: "absolute",
              top: "-12px",
              left: "4px",
              marginLeft: "-4px",
              backgroundColor: "#b1afaf",
              color: "#fff",
              fontSize: "12px",
              borderRadius: 50,
              height: "28px",
              zIndex: 1,
              "&::before": {
                content: "''",
                position: "absolute",
                top: "7px",
                right: "-16px",
                width: "15px",
                height: "15px",
                backgroundColor: "#fff",
              },
            }}
          />
        </Box>
      </Stack>
    </>
  );
}

export default T2;
