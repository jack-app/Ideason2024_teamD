import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./content/game";
import Home from "./content/home";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Game" element={<Game />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
