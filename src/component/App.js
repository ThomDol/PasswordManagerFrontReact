import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./Login";
import TokenProvider, { TokenContext } from "./TokenProvider";
import Url from "./Url";

function App() {
  return (
    <TokenProvider>
      <div className="App container mt-2">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </Router>
        <Login />
        <Url />
      </div>
    </TokenProvider>
  );
}

export default App;
