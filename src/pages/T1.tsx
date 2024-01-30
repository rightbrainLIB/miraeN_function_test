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
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

function T1() {
  const duration = 60;
  const [progress, setProgress] = useState(100);
  const chartRef = useRef(null);
  const [annotationY, setAnnotationY] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (chartRef.current) {
        setAnnotationY(() => {
          const newY = 150;
          return newY;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const options = {
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
      annotation: {
        annotations: {
          line1: {
            yMin: 50,
            yMax: 50,
            xMax: annotationY,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
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
  };

  const labels = ["January", "February", "March", "April"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        borderWidth: 1,
        borderRadius: 50,
        borderSkipped: false,
      },
    ],
  };

  return (
    <>
      <h2>시간표</h2>
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
      <Stack sx={{ width: "300px", display: "flex", flexDirection: "row" }}>
        <Bar options={options} data={data} ref={chartRef} />
        <Box sx={{ marginLeft: 10 }}>
          <List>
            <ListItem sx={{ padding: 0 }}>
              <Box sx={{ position: "relative" }}>
                <Divider
                  orientation="vertical"
                  sx={{ width: 1, height: 50, borderRight: 0, borderLeft: 1 }}
                />
                <Box
                  sx={{
                    overflow: "hidden",
                    height: 24,
                    position: "relative",
                    marginTop: -5,
                  }}
                >
                  <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 10,
                        width: 20,
                        height: 30,
                      }}
                    >
                      text
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
                    }}
                  ></ListItemIcon>
                </Zoom>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Stack>
    </>
  );
}

export default T1;
