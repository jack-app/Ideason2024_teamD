import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./content/game";
import Home from "./content/home";
import Soundtest from "./content/soundtest";
import Result from "./content/result";
import Rules from "./content/rules";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Game" element={<Game />} />
      <Route path="/" element={<Home />} />
      <Route path="/st" element={<Soundtest />} />
      <Route path="/result" element={<Result />} />
      <Route path="/rules" element={<Rules />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
