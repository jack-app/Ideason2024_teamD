import React from 'react';
import { Link } from 'react-router-dom';
import './../stylesheet/style.css'; // 必要に応じてCSSを適用するためにインポート
import { useRef, useLayoutEffect } from 'react';

let inited = 0;

// 各セルに適用するテクスチャを定義
let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function MyLink({ to, onClick, children }) {
    const handleClick = (event) => {
        inited = 0;
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <Link to={to} onClick={handleClick}>
            {children}
        </Link>
    );
}

function App() {
    const imgRef = useRef({});
    imgRef.current = {};
    useLayoutEffect(() => {
        const textures = {
            0: '/texture/bg.png',
            100: '/texture/bg.png',
            1: '/texture/ice.png',
            10: '/texture/penguin.png',
            11: '/texture/iceAm.png',
            12: '/texture/iceC.png',
            13: '/texture/iceEm.png',
            14: '/texture/iceF.png',
            15: '/texture/iceG.png',

        };


        // ====初期化処理====

        const startX = 8;
        const startY = 2;
        let playX = startX;
        let playY = startY;
        let play2X = startX;
        let play2Y = startY + 1;
        let playing = 11; // 操作中のブロックの色
        let playing2 = 11; // 操作中のブロック2の色
        const rows = 16;
        const columns = 16;


        // ====関数定義====

        function getRandomIntInRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // n ms待つ
        function wait(ms) {
            return new Promise(resolve => {
                if (inited === 0) {
                    window.location.reload();
                } else {
                    setTimeout(resolve, ms)
                }
            });
        }


        async function resetPenguin() {
            playing = getRandomIntInRange(11, 15);
            playing2 = getRandomIntInRange(11, 15);

            state = "penguinMoving";
            let penguin = 10;
            let y = 2;
            let max = 15;
            let min = 9;


            updateCellColor(y, min, 0);
            updateCellColor(y, max, playing);
            updateCellColor(y - 1, max, playing2);

            await wait(100);

            updateCellColor(y, max, penguin);
            updateCellColor(y, max - 1, playing);
            updateCellColor(y - 1, max - 1, playing2);
            updateCellColor(y - 1, max, 0);
            for (let i = max - 1; i >= min; i--) {
                await wait(100);
                updateCellColor(y, i + 1, 0);
                updateCellColor(y, i, penguin);
                updateCellColor(y, i - 1, playing);
                updateCellColor(y - 1, i - 1, playing2);
                updateCellColor(y - 1, i, 0);
            }
            state = "block";
            playX = startX;
            playY = startY;
            play2X = startX;
            play2Y = startY - 1;
            playBlock();
            for (let i = min; i < max; i++) {
                await wait(100);
                updateCellColor(y, i + 1, penguin);
                updateCellColor(y, i, 100);
            }
            await wait(100);
            updateCellColor(y, max, 0);
        }


        async function playBlock() {
            await wait(500);
            if (state === "block") {
                updateCellColor(playY, playX, 0);
                updateCellColor(play2Y, play2X, 0);

                if (playY < columns - 1 && grid[playY + 1][playX] === 0 && play2Y < columns - 1 && grid[play2Y + 1][play2X] === 0) {
                    playY++;
                    play2Y++;
                }
                else {
                    state = "check";
                }
                updateCellColor(playY, playX, playing);
                updateCellColor(play2Y, play2X, playing2);
                if (state === "check") {
                    check();
                } else {
                    playBlock();
                }
            }
        }

        // キーボード入力を処理する関数
        function handleKeyPress(event) {

            if (state === "block") {
                // 押されたキーのキーコードを取得
                const keyCode = event.keyCode;

                updateCellColor(playY, playX, 0);
                updateCellColor(play2Y, play2X, 0);

                // キーコードに応じて処理を行う
                switch (keyCode) {

                    case 37: // 左矢印キー
                        if (playX > 0 && grid[playY][playX - 1] === 0 && play2X > 0 && grid[play2Y][play2X - 1] === 0) {
                            playX--;
                            play2X--;
                        }
                        break;
                    /*case 38: // 上矢印キー
                        if (playY > 0 && grid[playY - 1][playX] === 0)
                            playY--;
                        break;
                    */
                    case 39: // 右矢印キー
                        if (playX < columns - 1 && grid[playY][playX + 1] === 0 && play2X < columns - 1 && grid[play2Y][play2X + 1] === 0) {
                            playX++;
                            play2X++;
                        }
                        break;
                    case 40: // 下矢印キー
                        if (playY < columns - 1 && grid[playY + 1][playX] === 0 && play2Y < columns - 1 && grid[play2Y + 1][play2X] === 0) {
                            playY++;
                            play2Y++;
                        }
                        else {
                            state = "check";
                        }
                        break;
                    default:
                        // 他のキーが押された場合は何もしない
                        break;
                }
                updateCellColor(playY, playX, playing);
                updateCellColor(play2Y, play2X, playing2);


                if (state === "check") {
                    check();
                }
            }
        }
        // キーボード入力イベントをリッスンする
        document.addEventListener('keydown', handleKeyPress);

        // セルの色を更新する関数
        function updateCellColor(row, column, st) {
            grid[row][column] = st;
            const key = `${row}-${column}`;
            if (imgRef.current[key]) {
                imgRef.current[key].src = textures[grid[row][column]];
            }
        }


        async function check() {
            var flag = 0;

            // 落下確認
            for (let i = 0; i < rows - 1; i++) {
                for (let j = 1; j < columns - 1; j++) {
                    if (grid[i][j] !== 0 && grid[i + 1][j] === 0) {
                        flag = 1;
                        updateCellColor(i + 1, j, grid[i][j]);
                        updateCellColor(i, j, 0);
                    }
                }
            }
            if (flag === 1) {
                check();
            } else {
                flag = 0;
                for (let i = 0; i < rows - 1; i++) {
                    for (let j = 1; j < columns - 1; j++) {
                        // 2つ繋がった確認
                        if (grid[i][j] !== 0 && grid[i][j] !== 1 && grid[i][j] !== 100 && grid[i][j] === grid[i][j + 1]) {
                            var tmp = grid[i][j];
                            await wait(300);
                            updateCellColor(i, j, 0);
                            updateCellColor(i, j + 1, 0);
                            await wait(300);
                            updateCellColor(i, j, tmp);
                            updateCellColor(i, j + 1, tmp);
                            await wait(300);
                            updateCellColor(i, j, 0);
                            updateCellColor(i, j + 1, 0);
                            await wait(300);
                            updateCellColor(i, j, tmp);
                            updateCellColor(i, j + 1, tmp);
                            await wait(300);
                            updateCellColor(i, j, 0);
                            updateCellColor(i, j + 1, 0);
                            check();
                            return;
                        }
                    }
                }
                resetPenguin();
            }
        }

        // ====ゲーム開始====

        let state = "start";
        if (inited === 0) {
            inited = 1;
            init();
        }
        function init() {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    const key = `${i}-${j}`;
                    if (imgRef.current[key]) {
                        imgRef.current[key].src = textures[grid[i][j]];
                    }
                }
            }
            resetPenguin();
        }

    }, []);
    return (
        <div className="App">
            <h1>Game</h1>
            <nav>
                <MyLink to="/">Home</MyLink>
            </nav>
            <table className="grid">
                <tbody>
                    {grid.map((row, i) => (
                        <tr key={i} className="row">
                            {row.map((cell, j) => (
                                <td key={j} className="cell">
                                    {/* key属性を使って再描画をトリガー */}
                                    <img ref={el => imgRef.current[`${i}-${j}`] = el} key={`${i}-${j}`}
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
        </div>
    );
}

export default App;