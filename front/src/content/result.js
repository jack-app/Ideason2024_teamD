import React from 'react';
import { Link,useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';

function Home() {
  const location = useLocation();
  const data = location.state; // データの取得
  return (
    <div>
      <Header />
      <nav>
        <Button text="game" to="/game" styleType="default" />
        <Link to="/st">Soundtest</Link>
        <p>Score: {data.scoreVal}</p> 
      </nav>
    </div>
  );
}

export default Home;

