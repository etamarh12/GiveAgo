import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/login';
import { HomePage } from './pages/homePage';

function App() {

  const user = useSelector(state => state.login.user || JSON.parse(localStorage.getItem('user')));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={user ? <HomePage /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;