import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegForm from "./pages/RegForm/RegistrationForm"
import RegList from "./pages/RegList/RegistrationList"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegForm/>}/>
          <Route path="/reg-list" element={<RegList/>}/>

          

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
