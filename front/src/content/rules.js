import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';
import './../stylesheet/rules.css';

function Home() {
  return (
    <div>
      <Header />
      <div className='box'>
       <h1 className='text'>ルール説明</h1>
      </div>
      <h2>ゲームの遊び方</h2>
      <p>横に2個同じブロックを並べて音を消そう！十字キーの方向に動くけど上には動かせないよ。</p>
      <p>ブロックが消えると音が鳴るよ！</p>
      <p>ブロックが積みあがったらゲームオーバー！</p>
      <h2>ブロックについて</h2>
      <p>アルファベットが書かれたブロックはカノンコードを表してるよ！</p>
      <p>オレンジのPを消すとドラムの有無が変わるよ！</p>
      <p>グレーのPを消すとベルの有無が変わるよ！</p>
      <p>虹色のPを消すと大チャンス！1番下が全部消えるよ！</p>
      <h2>リザルトについて</h2>
      <p>ゲームオーバーになったらスペースキーでリザルトに行こう！</p>
      <p>消したブロックで曲ができるよ！</p>
      <h2>アルファベットは何？</h2>
      <p>C,G,Am,Em,Fは高さが違う音を表してるよ。C→G→Am→Em→F→C→F→Gを繰り返すことをカノン進行と言うよ。</p>
    </div>
  );
}

export default Home;

