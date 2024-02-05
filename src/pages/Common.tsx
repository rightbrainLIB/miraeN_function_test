import Area from '../components/Area';
import BarHorizontal from '../components/BarHorizontal';
import DoughnutChart from '../components/Doughnut';
import CountUpEx from '../components/CountUp';
import Randar from '../components/Radar';
import SemiCircle from '../components/SemiCircle';
function S1() {
  return (
    <>
      <h2>공통</h2>
      <Randar />
      <BarHorizontal />
      <DoughnutChart />
      <CountUpEx />
      <SemiCircle />
      <Area />
    </>
  )
}

export default S1
