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

    const width = chartWidth;
    const height = chartHeight;
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
      label: '1',
      data: [2, 8, 3, 5, 2],
      backgroundColor: 'rgba(155, 155, 155, 0.2)',
      borderColor: 'rgba(155, 155, 155, 1)',
      borderWidth: 1,
    },
    {
      label: '2',
      data: [3, 5, 2, 1, 4],
      // backgroundColor: 'rgba(255, 99, 132, 0.2)',
      backgroundColor: function (context:any) {
        console.log(context);
        return createRadialGradient3(context);
      },
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false
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
  return (
    <>
      <h1>Randar</h1>
      <table className='info'>
        <tbody>
          <tr>
            <th>chartjs지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>배경색, 보더색, 보더굵기, 범례 숨기기, tick 제어</td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>배경 패턴 넣기, 도트 모양 바꾸기</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>애니메이션</td>
          </tr>
        </tbody>
      </table>
      <div style={{width:'500px',height:'500px'}}>
        <Radar data={data} options={options} />
      </div>
    </>
  )
}

export default Randar
