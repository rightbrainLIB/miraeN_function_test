import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController, Chart, ChartDataset } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import imgStripe from "../img/stripe.jpg"
import imgSquare from "../img/square.jpg"

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
	
	console.log(innerRadius)
	console.log(innerRadius)
	console.log(outerRadius)
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
		// tooltip: {
		// 	enabled: false
		// },
	}
}

function DoughnutChart() {
  return (
		<Box sx={{width : "410px", height: "410px", position: "relative", overflow: "visible"}}>
			<Doughnut data={outChartData} options={outChartOptions} plugins={plugins} />
			<Box sx={{width : "320px", height: "320px", position: "absolute", overflow: "visible", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
				<Doughnut data={innerChartData} options={innerChartOptions} plugins={plugins} />      
			</Box>  
		</Box>
	)
}

export default DoughnutChart