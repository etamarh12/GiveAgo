import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Login } from './pages/login/login';
import { HomePage } from './pages/homePage';
import { BusinessPage } from './pages/businessPage/businessPage';
import { DeliveryPage } from './pages/deliveryPage/deliveryPage';
import { ManagePage } from './pages/managePage/managePage';
import { logoutUser } from './actions/loginActions';

function App() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/allUsers');
        const usersArray = Object.values(response.data);
        const foundUser = usersArray.find(u => u.userId === user.userId);

        if (!foundUser) {
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, [user.userId, dispatch]);

  const renderRoutesBasedOnAccountType = () => {
    if (user.accountType === 'M') {
      return (
        <>
          <Route path="*" element={<HomePage />} />
          <Route path="/users" element={<ManagePage />} />
          <Route path="/deliveries" element={<DeliveryPage />} />
          <Route path="/business" element={<BusinessPage />} />
        </>
      );
    } else if (user.accountType === 'D') {
      return (
        <>
          <Route path="*" element={<HomePage />} />
          <Route path="/deliveries" element={<DeliveryPage />} />
        </>
      );
    } else if (user.accountType === 'B') {
      return (
        <>
          <Route path="*" element={<HomePage />} />
          <Route path="/business" element={<BusinessPage />} />
        </>
      );
    } else {
      // Handle invalid account type
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="*" /> : <Login />}
        />
        {isLoggedIn ? (
          <>
            {renderRoutesBasedOnAccountType()}
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;