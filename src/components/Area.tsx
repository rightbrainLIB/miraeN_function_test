import '../assets/init.css';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import imgStripe from "../img/stripe.jpg"
import imgSquare from "../img/square.jpg"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const stripe = new Image();
stripe.src = imgStripe;
const square = new Image();
square.src = imgSquare;

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['0점', '50점', '100점'];

function createDiagonalPattern(color = 'black') {
  // create a 10x10 px canvas for the pattern's base shape
  let shape = document.createElement('canvas')
  shape.width = 10
  shape.height = 10
  // get the context for drawing
  let c = shape.getContext('2d')
  if (c !== null) {
    // draw 1st line of the shape 
    c.strokeStyle = color
    c.beginPath()
    c.moveTo(2, 0)
    c.lineTo(10, 8)
    c.stroke()
    // draw 2nd line of the shape 
    c.beginPath()
    c.moveTo(0, 8)
    c.lineTo(2, 10)
    c.stroke()
    // create the pattern from the shape
    return c.createPattern(shape, 'repeat')
  } else {
    return null;
  }
}

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: createDiagonalPattern('gray') as any,
      lineTension: 0.5,
    },
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: createDiagonalPattern('blue') as any,
      lineTension: 0.5,
    },
    {
      fill: true,
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: createDiagonalPattern('red') as any,
      lineTension: 0.5,
    },
    
  ],
};


function Area() {


  return (
    <>
      <h1>Area</h1>
      <table className='info'>
        <tbody>
          <tr>
            <th>chartjs</th>
            <td>o</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>canvas패턴을 배경으로 깔기, <a href="https://www.chartjs.org/docs/2.9.4/charts/line.html" target="_blank">곡선표현 lineTension</a></td>
          </tr>
          <tr>
            <th>확인중</th>
            <td></td>
          </tr>
          <tr>
            <th>부분지원</th>
            <td></td>
          </tr>
          <tr>
            <th>불가</th>
            <td>애니메이션</td>
          </tr>
        </tbody>
      </table>
      <Line options={options} data={data} />
    </>
  )
}

export default Area;