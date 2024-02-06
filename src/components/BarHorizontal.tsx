import React, { useState, memo } from 'react'
import '../assets/init.css'
import styled from '@emotion/styled';
import Collapse from '@mui/material/Collapse';

const Box = styled.div`
    position:relative;
    height:50px;
    width: 500px;
    border:1px solid red;
    border-radius:25px;
    margin:10px;
    box-sizing:border-box;
    transition: all .3s ease;
`
  const Name = memo(styled.span`
    position:absolute;
    left:10px;
    top:50%;
    transform: translateY(-50%);
    z-index:2;
    color:#fff;
    font-size:12px;
  `)
function BarHorizontal() {
  const [checked, setChecked] = useState(false);
  const test = () => {
    setChecked((prev) => !prev)
  }
  return (
    <>
      <h1>BarHorizontal</h1>
      <table className='info'>
        <tbody>
          <tr>
            <th>chartjs, mui</th>
            <td>적당한게 없어서 직접 구현해야됨</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>직접 구현하기에 대부분 가능</td>
          </tr>
          <tr>
            <th>확인중</th>
            <td></td>
          </tr>
          <tr>
            <th>부분지원</th>
            <td></td>
          </tr>
        </tbody>
      </table>

      <Box>
        <Name>우리반</Name>
        <Collapse orientation="horizontal" collapsedSize={48} in={checked} style={{borderRadius:24}}>
          <div style={{ width: 498, height:48,backgroundColor:'green', borderRadius:24}}></div>
        </Collapse>
      </Box>
      <button onClick={test}>토글</button>
    </>
  )
}

export default React.memo(BarHorizontal);