import { BrowserRouter, Routes, Route } from 'react-router-dom';
import T1 from './pages/T1';
import T2 from './pages/T2';
import S1 from './pages/S1';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>미래엔 기능 테스트 (1.29) <a href="https://react-chartjs-2.js.org/" target="_blank" style={{fontSize:'12px'}}>react-chartjs-2 새창열기</a></h1>
      <ul>
        <li><Link to="/t1">선생님 홈 & 대시보드</Link></li>
        <li><Link to="/t2">선생님 수업하기</Link></li>
        <li><Link to="/s1">학생 수업하기</Link></li>
      </ul>
      <hr />
      <Routes>
        <Route path="/t1" element={<T1 /> } />
        <Route path="/t2" element={<T2 /> } />
        <Route path="/s1" element={<S1 />} />
      </Routes>
    </>
  )
}

export default App