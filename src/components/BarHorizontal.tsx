import '../assets/init.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const labels = [''];

export const data = {
  labels,
  datasets: [
    {
      label: '우리반',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '학년',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function BarHorizontal() {
  return (
    <>
      <h1>BarHorizontal</h1>
      <table className='info'>
        <tbody>
          <tr>
            <th>chartjs지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td></td>
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
            <td></td>
          </tr>
          
        </tbody>
      </table>
      <Bar options={options} data={data} />
    </>
  )
}

export default BarHorizontal