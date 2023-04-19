import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import {
  StyledManage,
  StyledFooter,
  StyledHeader,
  StyledPage,
  StyledSearch,
  StyledShipCard,
  StyledGroups,
  StyledCollection,
  StyledParagraph,
  StyledTitleCollection,
  StyledLogo
} from './managePage.styled';
import logo from '../../img/giveago.png'

import TopBar from '../topBar/topBar';

export function ManagePage() {
  const [users, setUsers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const user = useSelector(state => state.login.user);


  useEffect(() => {
    getUsers();
    getOrders();
    async function getUsers() {
      try {
        const response = await axios.get('http://localhost:3001/api/users/allUsers');
        const usersArray = Object.values(response.data)
        setUsers(usersArray);
      } catch (error) {
        console.error(error);
      }
    };
    async function getOrders() {
      try {
        const response = await axios.get('http://localhost:3001/api/orders/allOrders');
        const ordersArray = Object.values(response.data)
        setDeliveries(ordersArray);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

  const filteredUsers = users.filter(user => {
    return user.UserName.includes(searchValue);
  })

  const filteredDeliveries = deliveries.filter(delivery => {
    return delivery.OrderName.toString().includes(searchValue);
  }).reverse();

  return (
    <StyledPage>
      <StyledHeader>{user.UserName} <StyledLogo src={logo} alt="logo" /></StyledHeader>
        <StyledManage>
          <TopBar />
          <StyledSearch placeholder="( חיפוש ( שם משתמש / שם הלקוח" onChange={handleSearchChange} />
          <StyledGroups>
            <StyledCollection>
              <StyledTitleCollection>משתמשים</StyledTitleCollection>
              {filteredUsers.map(user => (
                <StyledShipCard key={user.userId}>
                  <StyledParagraph>שם משתמש: {user.UserName}</StyledParagraph>
                  <StyledParagraph>מספר סידורי: {user.userId}</StyledParagraph>
                  <StyledParagraph>סוג משתמש: {user.AccountType}</StyledParagraph>
                </StyledShipCard>
              ))}
            </StyledCollection>
            <StyledCollection>
              <StyledTitleCollection>הזמנות</StyledTitleCollection>
              {filteredDeliveries.map(delivery => (
                <StyledShipCard key={delivery.OrderId}>
                  <StyledParagraph>מספר סידורי: {delivery.OrderId}</StyledParagraph>
                  <StyledParagraph>שם הלקוח: {delivery.OrderName}</StyledParagraph>
                  <StyledParagraph>כתובת: {delivery.OrderAddress}</StyledParagraph>
                  {delivery.OrderAvailable === "ממתין" ? (
                    <StyledParagraph className='orange'>פעילות: {delivery.OrderAvailable}</StyledParagraph>
                  ) : delivery.OrderAvailable === "פעיל" ? (
                    <StyledParagraph className='green'>פעילות: {delivery.OrderAvailable}</StyledParagraph>
                  ) : delivery.OrderAvailable === "הושלם" ? (
                    <StyledParagraph className='red'>פעילות: {delivery.OrderAvailable}</StyledParagraph>
                  ) : null}
                  <StyledParagraph>שליח: {delivery.Carrier}</StyledParagraph>
                  <StyledParagraph>נוצר ב: {delivery.CreatedTime}</StyledParagraph>
                  <StyledParagraph>הסתיים ב: {delivery.EndedTime}</StyledParagraph>
                </StyledShipCard>
              ))}
            </StyledCollection>
          </StyledGroups>
          <StyledFooter>זכויות יוצרים © 2023 ChenWave R&D. כל הזכויות שמורות</StyledFooter>
        </StyledManage>
    </StyledPage>
  );
}
