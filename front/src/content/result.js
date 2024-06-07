import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';
import './../stylesheet/result.css';


let grid2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]/*,
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]*/
];

const textures = {
  0: '/texture/bg.png',
  100: '/texture/bg.png',
  1: '/texture/ice.png',
  10: '/texture/penguin.png',
  11: '/texture/iceC.png',
  12: '/texture/iceG.png',
  13: '/texture/iceAm.png',
  14: '/texture/iceEm.png',
  15: '/texture/iceF.png',
  16: '/texture/pen.png',
  17: '/texture/guin.png',
  18: '/texture/ppap.png',

};
// n ms待つ
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  });
}

function Home() {
  const imgRef = useRef({});
  imgRef.current = {};

  const location = useLocation();
  const data = location.state; // データの取得
  useLayoutEffect(() => {
      for (var i = 0; i < data.soundList.length; i++) {
        soundListAdd(data.soundList[i], i+1);
      }
    
    }, []);
  async function playSounds() {
    for (var i = 0; i < data.soundList.length; i++) {
      const audio = new Audio();
      audio.src = process.env.PUBLIC_URL + '/sound/' + data.soundList[i] + '.wav';
      audio.play();
      await wait(990);
      //stop();
    }
  }

  function soundListAdd(x, len) {
console.log(len);
    var row = 4 * (Math.floor(( len- 1) / 16) + 1) - 4;
    var column = ( len - 1) % 16;
    grid2[row][column] = x % 10 + 10;
    var key = `2-${row}-${column}`;
    if (imgRef.current[key]) {
      imgRef.current[key].src = textures[grid2[row][column]];
    }


    row++;
    if (Math.floor(x / 10) === 2 || Math.floor(x / 10) === 4 || Math.floor(x / 10) === 5) {
      grid2[row][column] = 16;
    } else {
      grid2[row][column] = 0;
    }
    key = `2-${row}-${column}`;
    if (imgRef.current[key]) {
      imgRef.current[key].src = textures[grid2[row][column]];

    }
    row++;
    if (Math.floor(x / 10) === 3 || Math.floor(x / 10) === 4 || Math.floor(x / 10) === 5) {
      grid2[row][column] = 17;
    } else {
      grid2[row][column] = 0;
    }
    key = `2-${row}-${column}`;
    if (imgRef.current[key]) {
      imgRef.current[key].src = textures[grid2[row][column]];
    }

    row++;
    if (Math.floor(x / 10) === 5) {
      grid2[row][column] = 18;
    } else {
      grid2[row][column] = 0;
    }
    key = `2-${row}-${column}`;
    if (imgRef.current[key]) {
      imgRef.current[key].src = textures[grid2[row][column]];
    }
  }

  return (
    <div>
      <Header />
      <nav>
        <table className="grid2">
          <tbody>
            {grid2.map((row, i) => (
              <tr key={i} className="row">
                {row.map((cell, j) => (
                  <td key={j} className="cell">
                    {/* key属性を使って再描画をトリガー */}
                    <img ref={el => imgRef.current[`2-${i}-${j}`] = el} key={`2-${i}-${j}`}
                      src='/texture/ice.png'
                      alt={``}
                      className="pixelated"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/*<Button text="Game" to="/game" styleType="default" />*/}
        <div className='scorebox'>
          <p>Score: {data.scoreData}</p>

          <p>soundList: {data.soundList}</p>
          <button onClick={() => playSounds()}>生成結果</button>
        </div>
      </nav>
    </div>
  );
}
export default Home;
