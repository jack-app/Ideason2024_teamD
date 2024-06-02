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
        <div className='box'>
         <div className='one'>
      <Button text="Game" to="/game" styleType="default" />
         </div>  
         <div className='two'>
      <Button text="SoundTest" to="/st" styleType="default" />
         </div>
         <div className='three'>
      <Button text="Rules" to="/rules" styleType="default" />
         </div>
        </div>
         
        <div className='penguin'>
          <img src="/image/pengin.png" alt="Penguin" />
        </div>
        <div className='onnpu'>
          <img src="/image/onnpu.png" alt="Music Note" />
        </div>
        
      <p className='title'>Penguin and </p>
     </nav>
    </div>
  );
}

export default Home;
