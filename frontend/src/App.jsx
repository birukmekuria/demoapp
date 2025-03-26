import "./App.css";

// Import the BrowserRouter, Routes & Route modules from react-router-dom
import { Routes, Route } from "react-router-dom";

// Import the Home component
import Home from "./Pages/Home";
// Import the Login component
import Login from "./Pages/Login";
// Import the AddEmployee component
import AddEmployee from "./Pages/AddEmployee";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-employee" element={<AddEmployee />} />
    </Routes>
  );
}

export default App;
