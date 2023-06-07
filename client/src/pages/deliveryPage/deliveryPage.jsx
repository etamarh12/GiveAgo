import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  StyledDeliveries,
  StyledFooter,
  StyledSearchBox,
  StyledPage,
  StyledSearch,
  StyledGroupOfBtn,
  StyledTitleCollection,
  StyledCollection,
  StyledButton,
  StyledParagraph
} from './deliveryPage.styled';
import TopBar from '../topBar/topBar';
import TakingDelivery from '../popUps/takingDelivery';
import CompleteDelivery from '../popUps/completeDelivery';

export function DeliveryPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isTakeDeliveryPopupOpen, setIsTakeDeliveryPopupOpen] = useState(false);
  const [isCloseDeliveryPopupOpen, setIsCloseDeliveryPopupOpen] = useState(false);

  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/orders/allOrders');
      const ordersArray = Object.values(response.data);
      setDeliveries(ordersArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleTakeDelivery = () => {
    setIsTakeDeliveryPopupOpen(true);
  };

  const handleCloseDelivery = () => {
    setIsCloseDeliveryPopupOpen(true);
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const searchLowercase = searchValue ? searchValue.toLowerCase() : '';
    return (
      delivery.OrderId.toString().toLowerCase().includes(searchLowercase) ||
      delivery.OrderName?.toLowerCase().includes(searchLowercase) ||
      delivery.Phone?.toLowerCase().includes(searchLowercase) ||
      delivery.OrderAddress?.toLowerCase().includes(searchLowercase) ||
      delivery.OrderAvailable?.toLowerCase().includes(searchLowercase) ||
      delivery.OrderNote?.toLowerCase().includes(searchLowercase) ||
      delivery.Carrier?.toLowerCase().includes(searchLowercase) ||
      delivery.CreatedTime?.toLowerCase().includes(searchLowercase) ||
      delivery.EndedTime?.toLowerCase().includes(searchLowercase)
    );
  }).reverse();

  const columnDefs = [
    { headerName: 'מספר סידורי', field: 'OrderId', width: 130 },
    { headerName: 'שם הלקוח', field: 'OrderName', width: 200 },
    { headerName: 'טלפון', field: 'Phone', width: 200 },
    { headerName: 'כתובת למשלוח', field: 'OrderAddress', width: 300 },
    {
      headerName: 'פעילות',
      field: 'OrderAvailable',
      width: 150,
      cellRendererFramework: ({ value }) => {
        let className = '';
        if (value === 'ממתין') {
          className = 'orange';
        } else if (value === 'חדש') {
          className = 'green';
        } else if (value === 'הושלם') {
          className = 'red';
        }
        return <StyledParagraph className={className}>פעילות: {value}</StyledParagraph>;
      },
    },
    {
      headerName: 'הערה',
      field: 'OrderNote',
      width: 300,
      cellRendererFramework: ({ value }) => (
        <div style={{ whiteSpace: 'normal', lineHeight: '1.5', wordWrap: 'break-word' }}>{value}</div>
      ),
    },
    { headerName: 'שליח', field: 'Carrier', width: 150 },
    { headerName: 'נוצר ב', field: 'CreatedTime', width: 200 },
    { headerName: 'הסתיים ב', field: 'EndedTime', width: 200 },
  ];

  const DeliveriesGrid = () => {
    return (
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={filteredDeliveries}
          enableFilter={true}
          enableSorting={true}
          enableRtl={true}
          suppressMenuHide={true}
        ></AgGridReact>
      </div>
    );
  };

  return (
    <StyledPage>
      <TopBar />
      <StyledDeliveries>
        <StyledSearch>
          <StyledSearchBox placeholder="חיפוש" onChange={handleSearchChange} />
        </StyledSearch>
        <StyledCollection>
          {isTakeDeliveryPopupOpen && (
            <TakingDelivery onClose={() => setIsTakeDeliveryPopupOpen(false)} key="take-delivery-popup" />
          )}
          {isCloseDeliveryPopupOpen && (
            <CompleteDelivery onClose={() => setIsCloseDeliveryPopupOpen(false)} key="close-delivery-popup" />
          )}
          <StyledTitleCollection>משלוחים</StyledTitleCollection>
          <StyledGroupOfBtn>
            <StyledButton onClick={handleTakeDelivery}>לקיחת משלוח</StyledButton>
            <StyledButton onClick={handleCloseDelivery}>סיום משלוח</StyledButton>
          </StyledGroupOfBtn>
          {!isTakeDeliveryPopupOpen && !isCloseDeliveryPopupOpen && <DeliveriesGrid />}
        </StyledCollection>
        <StyledFooter>זכויות יוצרים © 2023 ChenWave R&D. כל הזכויות שמורות</StyledFooter>
      </StyledDeliveries>
    </StyledPage>
  );
}