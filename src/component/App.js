
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';

function App() {
  return (
    <div className="App container mt-2">
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
