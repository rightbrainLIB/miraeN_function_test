import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import imgStripe from "../img/stripe.jpg"
import imgSquare from "../img/square.jpg"
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { Button, ButtonGroup } from '@mui/material';

ChartJS.register(
  LinearScale,
  BarElement,
  Tooltip,
  Legend,  
);

const stripe = new Image();
stripe.src = imgStripe;
const square = new Image();
square.src = imgSquare;

const barOptions = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false
    }
  },
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
          if (fillPattern !== null) {
            return fillPattern;
          }
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

function S1Bar() {
  return (
	<>
		<Bar data={barData} options={barOptions} />
		<ButtonGroup  sx={{width : "100%", paddingLeft: "26px", justifyContent: "space-between"}} variant='text' aria-label="loading button group">
			{
				labels.map(()=> {
					return <Button variant='contained' sx={{fontSize: "12px"}}>학습 추천하기</Button>
				})
			}
		</ButtonGroup>
	</>)
}

export default S1Bar