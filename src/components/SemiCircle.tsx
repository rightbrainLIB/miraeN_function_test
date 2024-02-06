import { useState } from 'react';
import '../assets/init.css';
import styled from '@emotion/styled';


const Wrap = styled.div`
  position:relative;
  width:300px;
  height:150px;
  overflow:hidden;
`
const Box = styled.div`
  width:300px;
  height:300px;
  box-sizing:border-box;
  border-radius:50%;
  border:150px solid #ccc;
  border-bottom-color: #0bf;
  border-right-color: #0bf;
  transition: all 2s;
  transform: rotate(45deg); // default angle 45 ~ 225
`
const Hide = styled.div`
  position:absolute;
  width:280px;
  height:280px;
  border-radius:50%;
  background:#fff;
  left:10px;
  top:10px;
`


function SemiCircle() {


  const [value, setValue] = useState(0);
  const [angle, setAngle] = useState(45);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setValue(Number(e.target.value));
    // 45 ~ 225의 범위를 퍼센트로 표현
    const tick = (225 - 45) / 100;
    setAngle((Number(e.target.value) * tick) + 45);
  }

  return (
    <>
      <h1>SemiCircle</h1>
      <table className='info'>
        <tbody>
          <tr>
            <th>chartjs, mui</th>
            <td>적당한게 없어서 직접 구현해야됨</td>
          </tr>
          <tr>
            <th>가능</th>
            <td></td>
          </tr>
          <tr>
            <th>디자인과 테스트해봐야되는 내용</th>
            <td>각도, 패턴, 마지막 라운드처리</td>
          </tr>
        </tbody>
      </table>
      <Wrap>
        <Box style={{ transform: `rotate(${angle}deg)` }}></Box>
        <Hide></Hide>
      </Wrap>
      <label>
        <input type="range" min="0" max="100" value={value} onChange={handleChange} /><span>{value}</span>%
      </label>
    </>
  )
}

export default SemiCircle;