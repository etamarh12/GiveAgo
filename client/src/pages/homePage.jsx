import React from 'react';
import { useSelector } from 'react-redux';
import { ManagePage } from './managePage/managePage';
import { BusinessPage } from './businessPage/businessPage';
import { DeliveryPage } from './deliveryPage/deliveryPage';
import { Login } from './login/login';

export const HomePage = () => {

    const user = useSelector(state => state.login.user || JSON.parse(localStorage.getItem('user')));
    
    if (user) {
        switch (user.AccountType) {
            case 'M':
                return <ManagePage />;
            case 'B':
                return <BusinessPage />;
            case 'D':
                return <DeliveryPage />;
            default:
                return <Login />;
        }
    } else {
        return <div>Loading...</div>;
    }
}