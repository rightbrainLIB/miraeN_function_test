import { Box } from '@mui/material';
import S1Bubble from '../components/S1Bubble';
import S1Bar from '../components/S1Bar';

function S1() {
  return (
    <>
      <h2>학생 수업하기</h2>
      <br />
      <h2>취약개념 분석 - Bar</h2>
      <table className="info">
        <tbody>
          <tr>
            <th>chartjs 지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>데이터에 패턴 넣기, x축 grid점선 표시, y축 없애기, 막대 radius</td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>-</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>프로토파이 형태의 애니메이션 불가, 낮은 값의 데이터의 경우 막대에 완전히 둥근 radius 적용되지 않음</td>
          </tr>
        </tbody>
      </table>
      <Box sx={{width : "600px", height: "300px", marginBottom:"56px"}}>
        <S1Bar />
      </Box>

      <br />
      <h2>우리반 학습 효율 분석 - Bubble</h2>
      <table className="info">
        <tbody>
          <tr>
            <th>chartjs 지원</th>
            <td>O</td>
          </tr>
          <tr>
            <th>가능</th>
            <td>학생 데이터에 이름라벨표시, 데이터에 패턴 넣기, 범례 라벨 원표시</td>
          </tr>
          <tr>
            <th>확인중</th>
            <td>x값이 100에 가까울 때 학생 이름라벨 점선 잘려보임</td>
          </tr>
          <tr>
            <th>불가</th>
            <td>프로토파이 형태의 애니메이션(원이 커지는 모션) 불가</td>
          </tr>
        </tbody>
      </table>
      <Box sx={{width : "580px", height: "380px"}}>
        <S1Bubble />
      </Box>
    </>
  )
}

export default S1
