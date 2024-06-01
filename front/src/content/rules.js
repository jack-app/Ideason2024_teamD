import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';

function Home() {
  return (
    <div>
      <Header />
      <nav>
        <Button text="game" to="/game" styleType="default" />
        <Link to="/st">Soundtest</Link>
      </nav>
      <h1>こんな感じに</h1>
      <h2>見出しを書いたり</h2>
      <p>文章を書いたり</p>
      <p>やりたい放題です。これがいわゆる「HTML」←検索ワード</p>
    </div>
  );
}

export default Home;

