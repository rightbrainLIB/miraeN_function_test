import '../assets/init.css'
import CountUp from 'react-countup';

function CountUpEx() {
  return (
    <>
      <h1>CountUp</h1>
      <table className='info'>
        <tbody>
          <tr>
            <th><a href="https://www.npmjs.com/package/react-countup" target="_blank">react-countup</a></th>
            <td></td>
          </tr>
          <tr>
            <th>가능</th>
            <td>시야에 들어오면 시작 + 시야밖에 나가면 초기화, 지연시간 설정, 듀레이션, 시작값, 종료값, 접두사, 접미사</td>
          </tr>
        </tbody>
      </table>
      <CountUp
        start={0}
        end={30}
        duration={2}
        suffix="시간"
        onEnd={() => console.log('Ended! 👏')}
        onStart={() => console.log('Started! 💨')}
        enableScrollSpy={true}
      >
        {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
            <button onClick={start}>Start</button>
          </div>
        )}
      </CountUp>
    </>
  )
}

export default CountUpEx;