import {
  Chart as ChartJS,
  PointElement,
	Legend,
	ChartDataset,
	ChartTypeRegistry,
	Point,
	BubbleDataPoint,
} from 'chart.js';
import imgStripe from "../img/stripe.jpg"
import imgSquare from "../img/square.jpg"
import {  Bubble } from 'react-chartjs-2';
import faker from 'faker';
// import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin, { PartialEventContext } from "chartjs-plugin-annotation";

ChartJS.register(
  PointElement,
	Legend,
  annotationPlugin
);

const stripe = new Image();
stripe.src = imgStripe;
const square = new Image();
square.src = imgSquare;

const yPos = (ctx: PartialEventContext) => {
	const chart = ctx.chart;
	const dataset = chart.data.datasets;
	const result : ChartDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[]>[] = dataset.filter((data) => data.label  === '이하나' );
	return result[0]!.data[0]!.y;
}
function xPos(ctx: PartialEventContext) {
	const chart = ctx.chart;
	const dataset = chart.data.datasets;
	const result = dataset.filter((data) => data.label  === '이하나' );
	return result[0]!.data[0]!.x + (result[0]!.data[0!].r / 4.7);
}

const bubbleOptions = {
	clip: 0,
	layout: {
		padding: {
			right: 110, 
			bottom: 25
		},
	},
	plugins: {
		legend: {
			labels: {
				usePointStyle: true,
			},
		},
		tooltip: {
			enabled: false
		},
		annotation: {
			annotations: {
				point1: {
					drawTime: 'afterDraw',
					pointStyle: 'triangle',
					xValue: (ctx: PartialEventContext) => xPos(ctx) + 8,//xMax
					yValue: (ctx: PartialEventContext) => yPos(ctx),
					backgroundColor: 'black',
					rotation: -90,
					radius: 6, //사이즈
					init: true,
				},
				label1: {
					drawTime: 'afterDraw',
					xValue: (ctx: PartialEventContext) => xPos(ctx) + 14,
					yValue: (ctx: PartialEventContext) => yPos(ctx),
					backgroundColor: 'black',
					content: ['이하나'],
					color: "white",
					borderRadius: 4,
					font: {
						size: 12,
					},
					init: true,
					xAdjust: 8,
				},
				label2: {
					drawTime: 'afterDraw',
					xValue: -4,
					yValue: 109,
					content: ['성취도'],
					color: "#444",
					borderRadius: 4,
					font: {
						size: 13,
					},
				},
				line1: {
					drawTime: 'afterDraw',
					init: true,
					yMin: (ctx: PartialEventContext) => yPos(ctx),
					yMax: (ctx: PartialEventContext) => yPos(ctx),
					xMin: (ctx: PartialEventContext) => xPos(ctx),
					xMax: (ctx: PartialEventContext) => xPos(ctx) + 8,//xMin + 8
					borderDash: [3, 3],
					borderColor: "black",
					borderWidth: 2,
				},
			}
		}
	},
	scales: {
		x: {
			max: 100,
			min: 0,
			beginAtZero: true,
			stacked: true,
			ticks: {
				stepSize: 25,
				autoSkip: false,
				callback: function(_value:number, index: number, ticks: Array<object>) {
				return (
					index === 0 ? '느림' : index === ticks.length - 1 ? '학습시간' : ""
					);
				}
			},
		},
		y: {
			max: 100,
			min: 0,
			beginAtZero: true,
			ticks: {
				stepSize: 25,
				autoSkip: false,
				callback: function(value: number) {
					return value + '%';
				}
			},
			grid: {
				drawTicks: false
			},
		},
	},
};
	
const bubbleData = {
	datasets: [{
		label: '우리반',
		data: Array.from({ length: 4 }, () => ({
			x: faker.datatype.number({ min: 0, max: 100 }),
			y: faker.datatype.number({ min: 0, max: 100 }),
			r: faker.datatype.number({ min: 10, max: 20 }),
		})),
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
	},
	{
		label: '학년',
		data: Array.from({ length: 4 }, () => ({
			x: faker.datatype.number({ min: 0, max: 100 }),
			y: faker.datatype.number({ min: 0, max: 100 }),
			r: faker.datatype.number({ min: 5, max: 20 }),
		})),
		backgroundColor: '#ddd',
	},
	{
		label: '이하나',
		data: Array.from({ length: 1 }, () => ({
			x: faker.datatype.number({ min: 0, max: 100 }),
			y: faker.datatype.number({ min: 0, max: 100 }),
			// y: 100,
			r: faker.datatype.number({ min: 5, max: 20 }),
		})),
		backgroundColor: square.onload = () => {
			const shape = document.createElement('canvas')
			const ctx = shape.getContext('2d')
			if(ctx) {
				const fillPattern = ctx.createPattern(square, 'repeat');
				if (fillPattern !== null) {
					return fillPattern;
				}
			}
		},
	},
],
};
function S1Bubble() {
  return <Bubble options={bubbleOptions} data={bubbleData} />
}

export default S1Bubble