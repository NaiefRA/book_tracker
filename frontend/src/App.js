import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Add from "./Add";
import LoginSignup from "./LoginSignup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSignup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/add" element={<Add />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
