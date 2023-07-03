// emailとパスワードをセットしてJWTトークンを獲得する処理　インスタアプリのAuth.tsxをよく見直して！

import React, { useEffect, useState } from 'react';
import { auth } from '../api/auth';

const Login = () => {
  const initialState = [];
  const [loading, setLoading] = useState(false);
  const [localJWT, setLocalJWT] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchAsyncLogin = async () => {
    try {
      const data = await auth();
      const access = data.access;
      localStorage.setItem('localJWT', access);
      setLocalJWT(access)
      setLoading(false);

      // ログイン成功時の処理
      console.log('ログインに成功しました');
    } catch (error) {
      // ログイン失敗時の処理
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAsyncLogin();
  }, []);

  return (
    <form onSubmit={fetchAsyncLogin}>
      <input
        type="text"
        placeholder="eメール"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export { Login };
