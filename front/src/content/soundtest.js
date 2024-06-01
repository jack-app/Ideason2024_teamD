import React from 'react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';


function Home() {

  const [play, { stop, pause }] = useSound(process.env.PUBLIC_URL + '/sound/11.wav');

  return (
    <div>
      <>
      <button onClick={() => play()}>音を鳴らす</button>
      <button onClick={() => stop()}>停止</button>
      <button onClick={() => pause()}>ポーズ</button>
    </>
    </div>
  );
}

export default Home;