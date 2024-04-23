import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Url from "./Url";
import Login from "./Login";
import AddNewUrl from "./AddNewUrl";
import UpdateUrl from "./UpdateUrl";
import ManageUsers from "./ManageUsers";
import UserCreationForm from "./UserCreationForm";
import ChooseRole from "./ChooseRole";

function App() {
  return (
    <div className="App container mt-2">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Url />} />
          <Route path="/createUser" element={<UserCreationForm />} />
          <Route path="/addNewUrl" element={<AddNewUrl />} />
          <Route path="/updateUrl/:id" element={<UpdateUrl />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/changeRole/:id" element={<ChooseRole />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
