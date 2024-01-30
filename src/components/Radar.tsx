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
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
