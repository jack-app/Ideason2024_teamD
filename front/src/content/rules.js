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
      <h1>ルール説明</h1>
      <h2>ゲーム中</h2>
      <p>横に2列同じブロックを並べて音を消そう！</p>
      <p>ブロックが消えると音が鳴るよ！</p>
      <p>虹色のブロックが消えると大チャンス！下1列が全部消えるよ！</p>
      <p>ブロックが積みあがったらゲームオーバー！</p>
      <h2>リザルト</h2>
      <p>ゲームオーバーになったらスペースキーでリザルトに行こう！</p>
      <p>消したブロックで曲ができるよ！</p>
    </div>
  );
}

export default Home;

