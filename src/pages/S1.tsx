import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import imgs from "../img/stripe.jpg"
import { Bar } from 'react-chartjs-2';
import { Bubble } from 'react-chartjs-2';
import faker from 'faker';
import { Box, Button, ButtonGroup } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);


const stripe = new Image();
stripe.src = imgs;

const barOptions = {
  responsive: true,
  plugins: [{
    title: false,
  }],
  scales: {
    x: {
      border: {
        display: true,
        color: '#888'
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
        dash: [3,4],
      },
      grid: {
        color: '#aaa',
        tickColor: '#000',
        tickBorderDash: [2, 3],
        tickWidth: 0,
      },
    },
  },
};

const labels = ['주제 추론', '빈칸 추론', '문장 배열', '문단 요약', '밑줄 의미'];
const barData = {
  labels,
  datasets: [
    {
      label: '이하나',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
      backgroundColor: stripe.onload = () => {
        const shape = document.createElement('canvas')
        const ctx = shape.getContext('2d')
        if(ctx) {
          const fillPattern = ctx.createPattern(stripe, 'repeat');
          return fillPattern
        }
      },
      borderRadius: 100,
    },
    {
      label: '학년',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
      backgroundColor: '#ccc',
      borderRadius: 100,
    },
  ],
};

const bubbleOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const bubbleData = {
  datasets: [
    {
      label: '우리반',
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: stripe.onload = () => {
        const shape = document.createElement('canvas')
        const ctx = shape.getContext('2d')
        if(ctx) {
          const fillPattern = ctx.createPattern(stripe, 'repeat');
          return fillPattern
        }
      },
    },
    {
      label: '학년',
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: '#ddd',
    },
  ],
};
function S1() {

  return (
    <>
      <h2>학생 수업하기</h2>
      <Box sx={{width : "600px", height: "300px", marginBottom:"56px"}}>
        <Bar data={barData} options={barOptions} />
        <ButtonGroup  sx={{width : "100%", paddingLeft: "26px", justifyContent: "space-between"}} variant='text' aria-label="loading button group">
          {
            labels.map(()=> {
              return <Button variant='contained' sx={{fontSize: "12px"}}>학습 추천하기</Button>
            })
          }
        </ButtonGroup>
      </Box>

      <Box sx={{width : "600px", height: "300px"}}>
        <Bubble options={bubbleOptions} data={bubbleData} />
      </Box>
    </>
  )
}

export default S1
