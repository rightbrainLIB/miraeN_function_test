import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import imgStripe from "../img/stripe.jpg"
import imgSquare from "../img/square.jpg"
import '../assets/init.css'
import CountUp from 'react-countup';
import { useState } from 'react';

ChartJS.register(
	ArcElement, 
	Tooltip, 
	Legend,
);

const drawBackground = (chart: Chart<'doughnut'>) => {
  const { ctx, width, height } = chart
  const { innerRadius } = chart.getDatasetMeta(chart.data.datasets.length - 1).controller as DoughnutController
  const { outerRadius } = chart.getDatasetMeta(0).controller as DoughnutController
  const radiusLength = outerRadius - innerRadius
	const x = width / 2
	const	y = height / 2

	ctx.beginPath()
	ctx.arc(x, y, outerRadius - radiusLength / 2, 0, 2 * Math.PI)
	ctx.lineWidth = radiusLength
	ctx.strokeStyle = "#ddd"
	ctx.stroke()
}

const stripe = new Image();
stripe.src = imgStripe;
const square = new Image();
square.src = imgSquare;

const outChartData = {
  labels: ['우리반', "null"],
  datasets: [
    {
      label: '우리반',
      data: [50, 50],
      backgroundColor: stripe.onload = () => {
				const shape = document.createElement('canvas')
				const ctx = shape.getContext('2d')
				if(ctx) {
					const fillPattern = ctx.createPattern(stripe, 'repeat');
					if (fillPattern !== null) {
						return [fillPattern, "transparent"];
					}
				}
			},
      borderWidth: 0,
			borderRadius: 50,
    },
  ],
};

const innerChartData = {
  labels: ['이하나', "null"],
  datasets: [
		{
      label: '이하나',
      data: [70, 30],
      backgroundColor: square.onload = () => {
				const shape = document.createElement('canvas')
				const ctx = shape.getContext('2d')
				if(ctx) {
					const fillPattern = ctx.createPattern(square, 'repeat');
					if (fillPattern !== null) {
						return [fillPattern, "transparent"];
					}
				}
			},
      borderWidth: 0,
			borderRadius: 50,
    },
  ],
	options: {
		cutout: 100,
	plugins: {
		legend: {
			display: false,
		},
	}
	}
};

const plugins = [{
	beforeDatasetsDraw: drawBackground,
}];

const outChartOptions = {
	clip: false,
	cutout: 170,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			enabled: false
		},
	}
}
const innerChartOptions = {
	clip: false,
	cutout: 125,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			enabled: false
		},
	}
}

function DoughnutChart() {
	const [show, setShow] = useState(true)
  function reDraw() {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 300);
  }
  
  return (
		<>
		<h1>Doughnut <button onClick={reDraw}>(차트 다시 그리기)</button></h1>
		<table className="info">
			<tbody>
				<tr>
					<th>chartjs 지원</th>
					<td>O</td>
				</tr>
				<tr>
					<th>가능</th>
					<td>데이터에 패턴 넣기, 숫자 카운트, 라인 채워지는 모션</td>
				</tr>
				<tr>
					<th>확인중</th>
					<td>-</td>
				</tr>
				<tr>
					<th>불가</th>
					<td>범례는 별도 코딩으로 넣야함</td>
				</tr>
			</tbody>
		</table>
		{show &&
			<Box sx={{width : "410px", height: "410px", position: "relative", overflow: "visible", marginBottom: "46px"}}>
				<CountUp
					start={0}
					end={outChartData.datasets[0].data[0]}
					duration={1}
					suffix="%"
					enableScrollSpy={true}
					>
					{({ countUpRef }) => (
						<div style={{fontSize: 28, position: "absolute", left: "50%", bottom: "-46px", transform: "translateX(-50%)"}}>
							<span ref={countUpRef} />
						</div>
					)}
				</CountUp>
				<Doughnut data={outChartData} options={outChartOptions} plugins={plugins} />
				<Box sx={{width : "320px", height: "320px", position: "absolute", overflow: "visible", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
				<CountUp
					start={0}
					end={innerChartData.datasets[0].data[0]}
					duration={1}
					suffix="%"
					enableScrollSpy={true}
					>
					{({ countUpRef }) => (
						<div style={{fontSize: 28, position: "absolute", left: "50%", bottom: "44px", transform: "translateX(-50%)"}}>
							<span ref={countUpRef} />
						</div>
					)}
				</CountUp>
					<Doughnut data={innerChartData} options={innerChartOptions} plugins={plugins} />      
				</Box>  
			</Box>
			}
		</>
	)
}

export default DoughnutChart