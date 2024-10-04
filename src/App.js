import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashbord from './componats/Dashbord';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashbord />} />
      </Routes>
    </>
  );
}

export default App;
