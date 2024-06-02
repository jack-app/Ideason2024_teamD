import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';
import './../stylesheet/home.css';

function Home() {
  return (
    <div>
      <Header />
      <nav>
      <Button text="Game" to="/game" styleType="default" />
      <Button text="SoundTest" to="/st" styleType="default" />
      <Button text="Rules" to="/rules" styleType="default" />
      <p className='title'>Penguin's Puzzle and Audio Production</p>
      </nav>
    </div>
  );
}

export default Home;

