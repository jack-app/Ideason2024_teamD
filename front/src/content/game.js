import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../stylesheet/style.css'; // 必要に応じてCSSを適用するためにインポート
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Header from '../components/header.jsx';

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

    const navigate = useNavigate();
    const [gameLog, setGameLog] = useState("ここにログが表示されますのじゃ🦊");
    var soundList = [];

    // ==========================================
    // !!!!!!!ゲーム外やり取り関係関数予定地!!!!!!!!
    // ==========================================

    // ログの表示
    function addGameLog(message) {
        setGameLog(prevLog => prevLog + '\n' + message);
    }

    // 音を鳴らす
    function sound(id) {
        addGameLog("[" + id + "の音を鳴らす]");
        const audio = new Audio();
        audio.src = process.env.PUBLIC_URL + '/sound/' + id + '.wav';
        audio.play();
    }

    // 得点加算
    const [scoreVal, setScore] = useState(0);

    function score(id, combo) {
        addGameLog(id + "を消しました；" + combo + "コンボ．");
        setScore(prevLog => prevLog + (2 ** (combo - 1)));
    }

    function gameover() {
        addGameLog("がめおべら");
        addGameLog("スペースキーでresultへ");
        const waitForSpace = () => {
            return new Promise(resolve => {
                const handleKeyDown = (event) => {
                    if (event.code === 'Space') {
                        window.removeEventListener('keydown', handleKeyDown);
                        resolve();
                    }
                };
                window.addEventListener('keydown', handleKeyDown);
            });
        };

        waitForSpace().then(() => {

            const path = '/result';
            const data = {scoreVal, soundList};

            // パスとデータを共有して画面遷移
            navigate(path, { state: data });
        });
    }

    // ==========================================
    // !!!!ゲーム外やり取り関係関数予定地おわり!!!!!
    // ==========================================

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
            16: '/texture/pen.png',
            17: '/texture/guin.png',
            18: '/texture/ppap.png',

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
        let combo = 0;

        let pen = 0;
        let guin = 0;

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
            playing = getRandomIntInRange(11, 18);
            playing2 = getRandomIntInRange(11, 18);

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
                    combo = 0;
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
                    combo = 0;
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
            if (grid[1][8] !== 0) {
                gameover();
                return;
            }
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

                            combo++;
                            if (tmp === 16) {
                                sound(100);
                                if (pen === 0) pen = 1; else pen = 0;
                            }
                            if (tmp === 17) {
                                sound(100);
                                if (guin === 0) guin = 1; else guin = 0;
                            }
                            let tmp2 = tmp;
                            if (pen === 1) {
                                if (guin === 1) {
                                    tmp2 += 30;
                                } else {
                                    tmp2 += 10;
                                }
                            } else if (guin === 1) {
                                tmp2 += 20;

                            }

                            if (tmp === 18) {
                                ppapFunc();
                                await wait(8000);
                                sound(100);
                            } else {
                                if (tmp !== 16 && tmp !== 17) {
                                    sound(tmp2);
                                    soundList.push(tmp2);
                                }
                            }
                            score(tmp2, combo);


                            for (let k = 0; k < 5; k++) {
                                await wait(100);
                                updateCellColor(i, j, 0);
                                updateCellColor(i, j + 1, 0);
                                await wait(100);
                                updateCellColor(i, j, tmp);
                                updateCellColor(i, j + 1, tmp);
                            }
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

        async function ppapFunc() {
            updateCellColor(14, 1, 0);
            sound(51);
            soundList.push(51);
            await wait(1000);
            updateCellColor(14, 2, 0);
            sound(52);
            soundList.push(52);
            await wait(1000);
            updateCellColor(14, 3, 0);
            sound(53);
            soundList.push(53);
            await wait(1000);
            updateCellColor(14, 4, 0);
            sound(54);
            soundList.push(54);
            await wait(1000);
            updateCellColor(14, 5, 0);
            sound(55);
            soundList.push(55);
            await wait(1000);
            updateCellColor(14, 6, 0);
            sound(51);
            soundList.push(51);
            await wait(1000);
            updateCellColor(14, 7, 0);
            sound(55);
            soundList.push(55);
            await wait(1000);
            updateCellColor(14, 8, 0);
            sound(52);
            soundList.push(52);
            await wait(1000);
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
            <Header />
            <div className="container">
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
                <div>
                    <h1>Game</h1>
                    <nav>
                        <MyLink to="/">Home</MyLink>
                    </nav>
                    <h2>Score: {scoreVal}</h2>

                    <h2>ログ</h2>
                    <textarea style={{ whiteSpace: 'pre-line' }} value={gameLog} readOnly rows="30" cols="100"></textarea>
                </div>
            </div>
        </div>
    );
}

export default App;