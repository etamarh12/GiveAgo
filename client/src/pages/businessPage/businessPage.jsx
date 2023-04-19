import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  StyledBusiness,
  StyledFooter,
  StyledHeader,
  StyledPage,
  StyledSearch,
  StyledShipCard,
  StyledTitleCollection,
  StyledParagraph,
  StyledCollection,
  StyledLogo
} from './businessPage.styled';
import logo from '../../img/giveago.png'
import TopBar from '../topBar/topBar'

export function BusinessPage() {
  const user = useSelector(state => state.login.user);
  const [deliveries, setDeliveries] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getOrders();
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
  const filteredDeliveries = deliveries.filter(delivery => {
    return delivery.OrderName.toString().includes(searchValue);
  }).reverse()

  return (
    <StyledPage>
      <StyledHeader>{user.UserName} <StyledLogo src={logo} alt="logo" /></StyledHeader>
      <StyledBusiness>
        <TopBar />
        <StyledSearch placeholder="חיפוש ( שם הלקוח )" onChange={handleSearchChange} />
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
              <StyledParagraph>הערה: {delivery.OrderNote}</StyledParagraph>
              <StyledParagraph>שליח: {delivery.Carrier}</StyledParagraph>
              <StyledParagraph>נוצר ב: {delivery.CreatedTime}</StyledParagraph>
              <StyledParagraph>הסתיים ב: {delivery.EndedTime}</StyledParagraph>
            </StyledShipCard>
          ))}
        </StyledCollection>
        <StyledFooter>זכויות יוצרים © 2023 ChenWave R&D. כל הזכויות שמורות</StyledFooter>
      </StyledBusiness>
    </StyledPage>
  )
}