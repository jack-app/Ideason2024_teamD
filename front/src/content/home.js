import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';
import '../stylesheet/background.css';

function Home() {
  return (
    <div>
      <Header />
      <nav>
      <Button text="プレイ" to="/game" styleType="default" />
      <Button text="音量" to="/st" styleType="default" />
      <Button text="ルール" to="/rules" styleType="default" />
      </nav>
    </div>
  );
}


export default Home;

