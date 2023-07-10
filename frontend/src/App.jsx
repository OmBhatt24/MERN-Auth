import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Welcome from "./component/Welcome";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Welcome />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
