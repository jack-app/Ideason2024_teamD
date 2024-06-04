import React from 'react';
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
      <p className='title'>Penguin's Puzzle and Audio Production</p>
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
          <img src="/texture/penguin.png" alt="Penguin"   width={200

          }/>
        </div>
        <div className='onnpu'>
          <img src="/texture/note.png" alt="Music Note" width={200
            
          } />
        </div>
     </nav>
    </div>
  );
}

export default Home;
