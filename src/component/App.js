import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./Login";
import AddNewUrl from "./AddNewUrl";
import UpdateUrl from "./UpdateUrl";

import UserCreationForm from "./UserCreationForm";

function App() {
  return (
    <div className="App container mt-2">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/createUser" element={<UserCreationForm />} />
          <Route path="/addNewUrl" element={<AddNewUrl />} />
          <Route path="/updateUrl/:id" element={<UpdateUrl />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
