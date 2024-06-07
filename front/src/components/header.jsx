// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/header.css'; // スタイルシートをインポート

const Header = () => {
  const handleReloadAndNavigate = (x) => (e) => {
    e.preventDefault(); // <Link>のデフォルトの動作を防ぐ
    window.location.assign(x); // ホーム画面に遷移
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <a href="/rules" onClick={handleReloadAndNavigate("/rules")}>ゲーム説明</a>
          </li>
          <li>
            <a href="/" onClick={handleReloadAndNavigate("/")}>ホーム画面に戻る</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
