import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./content/content";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Game />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
