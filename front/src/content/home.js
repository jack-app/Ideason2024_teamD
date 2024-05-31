import React from 'react';
import  Header from '../components/header.jsx';
import Button from '../components/button.jsx';

function Home() {
  return (
    <div>
      <Header />
      <nav>
          <Button text="game" to="/game" styleType="default" />
      </nav>
    </div>
  );
}

export default Home;
