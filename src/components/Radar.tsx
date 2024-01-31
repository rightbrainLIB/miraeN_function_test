import '../assets/init.css'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import imgs from "../img/stripe.jpg"
import { useState } from 'react';
const stripe = new Image();
stripe.src = imgs;

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function createRadialGradient3(context:any) {
    const chartArea = context.chart.chartArea;
    if (!chartArea) {
        // This case happens on initial chart load
        return;
      }
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    const ctx = context.chart.ctx;

    var gradient = ctx.createConicGradient(-1.0472, centerX, centerY);

    // The pattern is 30 degrees of blend between quadrants
    // 60 degrees of pure color in the quadrant
    gradient.addColorStop(0, 'rgba(78, 190, 235, .40)'); //blue
    gradient.addColorStop(.16667, 'rgba(78, 190, 235, .40)'); //blue
    gradient.addColorStop(0.25, 'rgba(255, 152, 49, .40)'); //orange
    gradient.addColorStop(0.41667, 'rgba(255, 152, 49, .40)'); //orange
    gradient.addColorStop(0.5, 'rgba(96, 230, 225, .40)');  // turqoise
    gradient.addColorStop(0.66667, 'rgba(96, 230, 225, .40)');  // turqoise
    gradient.addColorStop(0.75, 'rgba(45, 183, 87, .40)'); //green
    gradient.addColorStop(0.91667, 'rgba(45, 183, 87, .40)'); //green
    gradient.addColorStop(1, 'rgba(78, 190, 235, .40)'); //blue

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartWidth, chartHeight);
  
    return gradient;
  }

const data = {
  labels: ['듣기', '읽기', '말하기', '쓰기', '단어'],
  datasets: [
    {
      label: '영희',
      data: [2, 8, 3, 5, 2],
      backgroundColor: 'rgba(155, 155, 155, 0.2)',
      borderColor: 'rgba(155, 155, 155, 1)',
      borderWidth: 1,
      pointStyle: 'rectRot',
      pointRadius: 5,
      pointBorderColor: 'rgb(0, 0, 0)'
    },
    {
      label: '국희',
      data: [3, 5, 2, 1, 4],
      backgroundColor: function (context:any) {
        return createRadialGradient3(context);
      },
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: '명희',
      data: [1, 2, 6, 8, 3],
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
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};
const options = {
  animation: {
    // onProgress: function(animation:any) {
    //   console.log(animation);
    // },
    // onComplete: function () {
    //   console.log('end')
    // }
  },
  animations: {
    tension: {
      duration: 1000,
      from: 1,
      to: 0,
      loop: true,
      // easing: "easeInCirc",
    }
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
      },
    }
  },
  scales: {
    r: {
        min: 0,
        max: 8,
        beginAtZero: true,
        ticks: {
          display: false,
          stepSize: 2
        }
      }
  },
}

function Randar() {
  const [show, setShow] = useState(true)
  function reDraw() {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 300);
  }
  
  return (
    <>
      <h1>Randar <button onClick={reDraw}>(차트 다시 그리기)</button></h1>
      <table className='info'>
        <tbody>
          <tr>
            <th>chartjs지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td><a href="https://www.chartjs.org/docs/latest/general/colors.html" target="_blank">배경색, 보더색</a>, 보더굵기, <a href="https://www.chartjs.org/docs/latest/configuration/legend.html" target="_blank">범례 숨기기</a>, <a href="https://www.chartjs.org/docs/latest/samples/scale-options/ticks.html" target="_blank">tick 제어</a>, 배경 패턴 넣기, <a href="https://www.chartjs.org/docs/latest/samples/legend/point-style.html" target="_blank">포인트 스타일 변경</a><a href="https://www.chartjs.org/docs/latest/configuration/elements.html#types">지원가능 포인트 스타일</a></td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>animations-tension-easing</td>
          </tr>
          <tr>
            <th>부분지원</th>
            <td><a href="https://www.chartjs.org/docs/latest/configuration/animations.html" target="_blank">애니메이션 (한계 있음)</a>, 그라디언트 배경(툴팁 오픈시 화면 깨짐) </td>
          </tr>
          <tr>
            <th>불가</th>
            <td>프로토파이 형태의 애니메이션 불가</td>
          </tr>
          
        </tbody>
      </table>
      <div style={{ width: '500px', height: '500px' }}>
        {show &&
          <Radar data={data} options={options} />
        }
      </div>
    </>
  )
}

export default Randar
