import { Routes, Route } from 'react-router-dom';
import Common from './pages/Common';
import T1 from './pages/T1';
import T2 from './pages/T2';
import S1 from './pages/S1';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>미래엔 기능 테스트 (1.29)
        <a href="https://react-chartjs-2.js.org/" target="_blank" style={{ fontSize: '12px' }}>react-chartjs-2</a>
        / 
        <a href="https://www.chartjs.org/docs/latest/" target="_blank" style={{ fontSize: '12px' }}>chartjs</a>
        / 
        <a href="https://yeon22.github.io/Chartjs-kr/docs/latest/" target="_blank" style={{ fontSize: '12px' }}>chartjs 한글 메뉴얼</a>
        /
        <a href="https://mui.com/material-ui/all-components/" target="_blank" style={{fontSize : '12px'}}>mui</a>
      </h1>
      <ul>
        <li><Link to="/miraeN_function_test/common">공통</Link></li>
        <li><Link to="/miraeN_function_test/t1">선생님 홈 & 대시보드</Link></li>
        <li><Link to="/miraeN_function_test/t2">선생님 수업하기</Link></li>
        <li><Link to="/miraeN_function_test/s1">학생 수업하기</Link></li>
      </ul>
      <hr />
      <Routes>
        <Route path="/miraeN_function_test/common" element={<Common /> } />
        <Route path="/miraeN_function_test/t1" element={<T1 /> } />
        <Route path="/miraeN_function_test/t2" element={<T2 /> } />
        <Route path="/miraeN_function_test/s1" element={<S1 />} />
      </Routes>
    </>
  )
}

export default App
