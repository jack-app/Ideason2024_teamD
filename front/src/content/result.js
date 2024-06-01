import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';


// n ms待つ
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  });
}

function Home() {

  const location = useLocation();
  const data = location.state; // データの取得
   
  
  async function playSounds() {
      for (var i = 0; i < data.soundList.length; i++) {
        const audio = new Audio();
        audio.src = process.env.PUBLIC_URL + '/sound/' + data.soundList[i] + '.wav';
        audio.play();
        await wait(990);
        //stop();
      }
    }

  return (
    <div>
      <Header />
      <nav>
        <Button text="game" to="/game" styleType="default" />
        <Link to="/st">Soundtest</Link>
        <p>Score: {data.scoreVal}</p>
        <p>soundList: {data.soundList}</p>
        <button onClick={() => playSounds()}>生成結果</button>
      </nav>
    </div>
  );
}
export default Home;
