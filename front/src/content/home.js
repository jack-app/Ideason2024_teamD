import React from 'react';
import { Link } from 'react-router-dom';
import  Header from '../components/header.jsx';

function Home() {
  return (
    <div>
      <Header />
      <nav>
          <Link to="/game">Game</Link>
      </nav>
    </div>
  );
}

export default Home;
