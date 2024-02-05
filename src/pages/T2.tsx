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
        display: false,
        drawTicks: false,
      },
      ticks: {
        // callback: function (value: number | string) {
        //   const marker =
        //     '<div style="display: inline-block; width: 20px; height: 20px; background-color: red; margin-right: 5px;"></div>';
        //   return marker + value;
        // },
      },
    },
    y: {
      min: 0,
      max: 100,
      grid: {
        display: true,
        drawTicks: false,
        // tickLength: 20,
      },
      ticks: {
        stepSize: 25,
        padding: 10,
      },
      border: {
        display: false,
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
              추가해야함)
            </td>
          </tr>
        </tbody>
      </table>
      <Stack sx={{ width: "300px", margin: 5 }}>
        <Line options={options} data={data} />
      </Stack>
    </>
  );
}

export default T2;
