import { useState, useEffect, useRef } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  CircularProgress,
  Typography,
  Box,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Slide,
  Zoom,
  Chip,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Chart, Bubble } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

const lineoffset = {
  id: "lineoffset",
  // afterDraw: (chart: {
  //   ctx: any;
  //   data: { datasets: any };
  //   scales: { x: any; y: any };
  // }) => {
  //   const ctx = chart.ctx;
  //   const datasets = chart.data.datasets;
  //   const xAxis = chart.scales.x;
  //   const yAxis = chart.scales.y;

  //   const datasetIndex = datasets.findIndex(
  //     (dataset: { label: string }) => dataset.label === "Dataset 2"
  //   );
  //   [];

  //   const lineData = datasets[datasetIndex].data;

  //   ctx.save();
  //   ctx.beginPath();
  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = "rgb(255, 99, 132)";
  //   lineData.forEach((value: number, index: number) => {
  //     const x = xAxis.getPixelForValue(index);
  //     const y = yAxis.getPixelForValue(value);
  //     if (index === 0) {
  //       ctx.moveTo(x - 10, y);
  //     } else {
  //       ctx.lineTo(x - 10, y);
  //     }
  //   });
  //   ctx.stroke();

  //   lineData.forEach((value: number, index: number) => {
  //     const x = xAxis.getPixelForValue(index);
  //     const y = yAxis.getPixelForValue(value);
  //     ctx.beginPath();
  //     ctx.arc(x - 10, y, 3, 0, 2 * Math.PI);
  //     ctx.fillStyle = "rgb(255, 99, 132)";
  //     ctx.fill();
  //   });

  //   ctx.restore();
  // },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  lineoffset
);

function T1() {
  const duration = 60;
  const [progress, setProgress] = useState(100);
  const chartRef = useRef(null);
  const chartRef02 = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress - 100 / duration;
        if (newProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newProgress;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = {
    responsive: true,
    layout: {
      padding: {
        left: 80,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        offset: true,
        beginAtZero: true,
        display: false,
        max: 100,
        min: 0,
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      lineoffset: false,
      // annotation: {
      //   clip: false,
      //   annotations: [
      //     {
      //       borderColor: "rgb(0, 0, 0)",
      //       borderWidth: 1,
      //       borderStyle: "dashed",
      //       borderDash: [2, 2],
      //       //  beforeDraw: drawExtraLine,
      //       label: {
      //         display: true,
      //         content: "2학년 평균",
      //         position: {
      //           x: "start",
      //           y: "start",
      //         },
      //         xAdjust: -140,
      //         yAdjust: 20,
      //       },
      //       yMin: 50,
      //       yMax: 50,
      //     },
      //   ],
      // },
    },
  };

  const labels = ["1반", "2반", "3반", "4반"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        categoryPercentage: 0.8,
        barPercentage: 0.5,
        data: [65, 59, 80, 81],
        backgroundColor: (context: { dataIndex: number }) => {
          const shape = document.createElement("canvas");
          const ctx = shape?.getContext("2d");
          if (ctx) {
            // const gradient = ctx.createLinearGradient(
            //   0,
            //   0,
            //   shape.width,
            //   shape.height
            // );
            const gradient = ctx.createLinearGradient(0, shape.width, 0, 10);

            if (context.dataIndex === 2) {
              gradient.addColorStop(0, "rgba(255, 0, 0, 0.5)");
              gradient.addColorStop(1, "rgba(0, 0, 255, 0.5)");
            } else {
              gradient.addColorStop(0, "rgba(144, 238, 144, 0.5)");
              gradient.addColorStop(0.5, "rgba(144, 238, 144, 0.8)");
              gradient.addColorStop(1, "rgba(0, 128, 0, 1)");
            }

            return gradient;
          }

          return undefined;
        },
        // borderColor: [
        //   "rgb(255, 99, 132)",
        //   "rgb(255, 159, 64)",
        //   "rgb(255, 205, 86)",
        //   "rgb(75, 192, 192)",
        // ],
        borderWidth: 1,
        borderRadius: 50,
        borderSkipped: false,
      },
    ],
  };

  const createPattern = (
    backgroundColor: string = "#fff",
    lineColor: string = "#ccc"
  ) => {
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return null;

    patternCanvas.width = 7;
    patternCanvas.height = 5;

    patternCtx.fillStyle = backgroundColor;
    patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

    patternCtx.strokeStyle = lineColor;
    patternCtx.lineWidth = 1;

    patternCtx.beginPath();
    patternCtx.moveTo(0, 5);
    patternCtx.lineTo(7, 0);
    patternCtx.stroke();

    return patternCtx.createPattern(patternCanvas, "repeat");
  };

  const pattern = createPattern(
    "rgba(255, 99, 132, .3)",
    "rgba(255, 99, 132, .5)"
  ) as CanvasPattern;

  const options02 = {
    responsive: true,

    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      lineoffset: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          padding: 5,
        },
        grid: {
          drawTicks: false,
          display: true,
        },
      },
      x2: {
        display: false,
        offset: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const labels02 = ["January", "February", "March", "April"];
  const data02 = {
    labels: labels02,
    datasets: [
      // {
      //   type: "line" as const,
      //   label: "Dataset 1",
      //   borderColor: "rgb(255, 99, 132)",
      //   borderWidth: 2,
      //   fill: false,
      //   data: [60, 50, 100, 150],
      //   pointStyle: "rect",
      //   pointRadius: 2,
      //   pointHoverRadius: 2,
      //   xAxisID: "x2",
      // },
      {
        type: "bar" as const,
        label: "Dataset 2",
        backgroundColor: pattern,
        borderRadius: 50,
        borderColor: "rgb(255, 99, 132)",
        data: [60, 50, 100, 150],
        borderWidth: 2,
      },
      {
        type: "bar" as const,
        label: "Dataset 3",
        borderRadius: 50,
        backgroundColor: "rgb(155, 155, 155)",
        data: [60, 50, 100, 150],
      },
    ],
  };

  const options03 = {
    plugins: {
      lineoffset: false,
      legend: {
        display: false,
        labels: {
          usePointStyle: true,
          boxWidth: 5,
          boxHeight: 5,
          font: {
            size: 10,
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        ticks: {
          stepSize: 25,
          padding: 10,
          callback: function (value: number | string) {
            if (parseInt(value.toString()) == 0) {
              return "느림";
            }

            if (parseInt(value.toString()) == 100) {
              return "학습시간";
            }

            return "";
          },
        },
        grid: {
          display: true,
          drawTicks: false,
        },
      },
      y: {
        title: {
          display: false,
          text: "성취도",
          // align: "end",
        },
        ticks: {
          stepSize: 25,
          padding: 10,
        },
        grid: {
          display: true,
          drawTicks: false,
        },
      },
    },
  };

  const data03 = {
    datasets: [
      {
        label: "우리반",
        data: [
          {
            x: 20,
            y: 30,
            r: 10,
          },
          {
            x: 40,
            y: 100,
            r: 10,
          },
          {
            x: 60,
            y: 36,
            r: 10,
          },
          {
            x: 80,
            y: 20,
            r: 10,
          },
        ],
        backgroundColor: pattern,
      },
      {
        label: "학년",

        data: [
          {
            x: 69,
            y: 55,
            r: 15,
          },
          {
            x: 40,
            y: 30,
            r: 10,
          },
          {
            x: 44,
            y: 36,
            r: 10,
          },
          {
            x: 65,
            y: 31,
            r: 10,
          },
        ],
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
    ],
  };

  return (
    <>
      <h2>시간표</h2>
      <table className="info">
        <tbody>
          <tr>
            <th>mui지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>Timeline, 애니메이션 keyframes, useEffect interval </td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>-</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>없음</td>
          </tr>
        </tbody>
      </table>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "500px",
          position: "relative",
        }}
      >
        <Timeline sx={{ width: "200px" }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Eat</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  backgroundColor: "black",
                  animation: "ripple 1.2s infinite",
                  "@keyframes ripple": {
                    "0%": {
                      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.4)",
                    },
                    "100%": {
                      boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)",
                    },
                  },
                }}
              />
              <TimelineConnector
                sx={{ borderStyle: "dotted", borderWidth: "1px", width: "1px" }}
              />
            </TimelineSeparator>
            <TimelineContent>Code</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot sx={{ backgroundColor: "black" }} />
            </TimelineSeparator>
            <TimelineContent>Sleep</TimelineContent>
          </TimelineItem>
        </Timeline>

        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "3px dotted #1976d2",
                boxSizing: "border-box",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {`${Math.round(duration * (progress / 100))}초`}
            </Typography>
          </Box>
        </Box>
      </Stack>
      <h2>학습시간 분석</h2>
      <table className="info">
        <tbody>
          <tr>
            <th>chartjs 지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>grid, scales y축 안보이게 가능</td>
          </tr>
          <tr>
            <th>확인필요</th>
            <td>평균부분 html 추가한 부분이라 접근성 관련 확인필요</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>프로토파이 형태의 애니메이션 불가, 색변화 불가</td>
          </tr>
        </tbody>
      </table>
      <Stack
        sx={{
          position: "relative",
          width: "300px",
          display: "flex",
          flexDirection: "row",
          marginLeft: 20,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Bar options={options} data={data} ref={chartRef} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "1px",
            top: "50%",
            left: 0,
            marginTop: "-10px",
            opacity: 0,
            animation: "slideInFromBottom 0.5s 0.5s forwards",
            "@keyframes slideInFromBottom": {
              from: {
                transform: "translateY(30px)",
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
              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: "8px solid #000",
                transform: "translate(-50%, -50%) rotate(180deg)",
                zIndex: 1,
              },
            }}
          >
            <Divider
              sx={{
                position: "relative",
                borderColor: "#000",
                borderStyle: "dashed",
                opacity: 0,
                zIndex: 1,
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
              }}
            />
          </Box>
          <Chip
            label="2학년 평균"
            sx={{
              marginLeft: "-4px",
              marginTop: "10px",
              backgroundColor: "#000",
              color: "#fff",
              fontSize: "12px",
              borderRadius: 0,
              height: "28px",
            }}
          />
        </Box>
      </Stack>
      <table className="info">
        <tbody>
          <tr>
            <th>mui 지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td> mui 컴포넌트 + transition</td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>-</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <Stack>
        <Box sx={{ marginLeft: 10 }}>
          <List sx={{ display: "flex", flexDirection: "row" }}>
            <ListItem sx={{ padding: 0, width: "80px" }}>
              <Box sx={{ position: "relative" }}>
                <Divider
                  orientation="vertical"
                  sx={{ width: 1, height: 50, borderRight: 0, borderLeft: 1 }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-5px",
                    left: "7px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  1반
                </Typography>
                <Box
                  sx={{
                    overflow: "hidden",
                    height: 24,
                    position: "relative",
                    marginTop: -5,
                  }}
                >
                  <Slide
                    direction="up"
                    timeout={1000}
                    in={true}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 10,
                        // width: 20,
                        // height: 30,
                        fontSize: 12,
                      }}
                    >
                      편안
                    </Box>
                  </Slide>
                </Box>
                <Zoom in={true} mountOnEnter unmountOnExit>
                  <ListItemIcon
                    sx={{
                      marginTop: 2,
                      minWidth: 40,
                      width: 40,
                      height: 40,
                      backgroundColor: "lightblue",
                      borderRadius: "50%",
                      animation: "bounce 0.7s",
                      "@keyframes bounce": {
                        "0%, 20%, 50%, 80%, 100%": {
                          transform: "scale(1)",
                        },
                        "40%": {
                          transform: "scale(1.5)",
                        },
                        "60%": {
                          transform: "scale(1.2)",
                        },
                      },
                    }}
                  ></ListItemIcon>
                </Zoom>
              </Box>
            </ListItem>
            <ListItem sx={{ padding: 0, width: "80px" }}>
              <Box sx={{ position: "relative" }}>
                <Divider
                  orientation="vertical"
                  sx={{ width: 1, height: 50, borderRight: 0, borderLeft: 1 }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-5px",
                    left: "7px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  2반
                </Typography>
                <Box
                  sx={{
                    overflow: "hidden",
                    height: 24,
                    position: "relative",
                    marginTop: -5,
                  }}
                >
                  <Slide
                    direction="up"
                    timeout={1000}
                    in={true}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 10,
                        // width: 20,
                        // height: 30,
                        fontSize: 12,
                      }}
                    >
                      좋음
                    </Box>
                  </Slide>
                </Box>
                <Zoom in={true} mountOnEnter unmountOnExit>
                  <ListItemIcon
                    sx={{
                      marginTop: 2,
                      minWidth: 40,
                      width: 40,
                      height: 40,
                      backgroundColor: "lightsteelblue",
                      borderRadius: "50%",
                      animation: "bounce 0.7s",
                      "@keyframes bounce": {
                        "0%, 20%, 50%, 80%, 100%": {
                          transform: "scale(1)",
                        },
                        "40%": {
                          transform: "scale(1.5)",
                        },
                        "60%": {
                          transform: "scale(1.2)",
                        },
                      },
                    }}
                  ></ListItemIcon>
                </Zoom>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Stack>
      <h2>학습 시간 변화</h2>
      <table className="info">
        <tbody>
          <tr>
            <th>chartjs 지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>bar+line 혼합차트</td>
          </tr>
          <tr>
            <th>확인필요</th>
            <td>
              첫번째 bar 위에 있는 line 이 line chart 인지 단순 line point
              부분인지 확인필요
            </td>
          </tr>
          <tr>
            <th>불가</th>
            <td>
              프로토파이 형태의 애니메이션 불가, 자연스러운 패턴 불가, line 차트
              위치 조정 불가
            </td>
          </tr>
        </tbody>
      </table>
      <Stack sx={{ width: "300px", display: "flex", flexDirection: "row" }}>
        <Chart type="bar" options={options02} data={data02} ref={chartRef02} />
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
            <th>확인</th>
            <td>-</td>
          </tr>
          <tr>
            <th>확인필요</th>
            <td>학습시간 위치가 x 좌표 데이터에 위치해서 확인이 필요함</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>
              프로토파이 형태의 애니메이션 불가, legend 간격 조정 불가(별도로
              추가 필요)
            </td>
          </tr>
        </tbody>
      </table>
      <Stack
        sx={{
          width: "400px",
          display: "flex",
          flexDirection: "colum",
          marginBottom: 10,
          marginTop: 2,
          marginLeft: 5,
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "center",
            minWidth: "120px",
          }}
        >
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon
              sx={{
                marginRight: 0.7,
                minWidth: "8px",
                width: "8px",
                height: "8px",
                backgroundImage:
                  "linear-gradient(to bottom right, palevioletred 25%, pink 0, pink 50%, palevioletred 0, palevioletred 75%, pink 0)",
                backgroundSize: "3px 3px",
                borderRadius: "50%",
              }}
            ></ListItemIcon>
            <Typography sx={{ fontSize: "10px" }}>우리반</Typography>
          </ListItem>
          <ListItem sx={{ padding: 0 }}>
            <ListItemIcon
              sx={{
                marginRight: 0.7,
                minWidth: "8px",
                width: "8px",
                height: "8px",
                backgroundColor: "rgba(0, 0, 0, .2)",
                borderRadius: "50%",
              }}
            ></ListItemIcon>
            <Typography sx={{ fontSize: "10px" }}>학년</Typography>
          </ListItem>
        </List>
        <Typography sx={{ fontSize: 12 }}>성취도</Typography>
        <Bubble options={options03} data={data03} />
      </Stack>
    </>
  );
}

export default T1;
