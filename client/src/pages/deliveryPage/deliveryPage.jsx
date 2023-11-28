import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  StyledDeliveries,
  StyledFooter,
  StyledSearchBox,
  StyledPage,
  StyledSearch,
  StyledTitleCollection,
  StyledCollection,
  StyledButton,
  StyledParagraph,
} from './deliveryPage.styled';
import TopBar from '../topBar/topBar';
import TakingDelivery from '../popUps/takingDelivery';
import DeleteReqPopup from '../popUps/deleteReqPopup';
import CompleteDelivery from '../popUps/completeDelivery';

export function DeliveryPage() {
  const user = useSelector(state => state.login.user);
  const [deliveries, setDeliveries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isTakingDeliveryPopupOpen, setIsTakingDeliveryPopupOpen] = useState(false);
  const [isFinishDeliveryPopupOpen, setIsFinishDeliveryPopupOpen] = useState(false);
  const [isDeleteDeliveryPopupOpen, setIsDeleteDeliveryPopupOpen] = useState(false);


  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/orders/allOrders');
      const ordersArray = Object.values(response.data);
      setDeliveries(ordersArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleTakingDelivery = (rowData) => {
    setSelectedRowData(rowData);
    setIsTakingDeliveryPopupOpen(true);
  };
  const handleDeleteDelivery = (rowData) => {
    setSelectedRowData(rowData);
    setIsDeleteDeliveryPopupOpen(true);
  };

  const handleFinishDelivery = (rowData) => {
    setSelectedRowData(rowData);
    setIsFinishDeliveryPopupOpen(true);
  };

  const handleCloseTakingPopup = () => {
    setIsTakingDeliveryPopupOpen(false);
  };
  const handleCloseDeletePopup = () => {
    setIsDeleteDeliveryPopupOpen(false);
  };

  const handleCloseFinishPopup = () => {
    setIsFinishDeliveryPopupOpen(false);
  };

  const TakeDeliveryButton = ({ data }) => {
    if (data.OrderAvailable === 'חדש') {
      return (
        <StyledButton onClick={() => handleTakingDelivery(data)}>לקחת</StyledButton>
      );
    }
    return null;
  };
  const DeleteDeliveryButton = ({ data }) => {
    if (user && user.accountType === 'M') {
      return (
        <StyledButton onClick={() => handleDeleteDelivery(data)}>מחיקה</StyledButton>
      );   
    }
    return null;
  };

  const FinishDeliveryButton = ({ data }) => {
    if (data.OrderAvailable === 'ממתין' && data.Carrier === user.UserName) {
      return (
        <StyledButton onClick={() => handleFinishDelivery(data)}>לסיים</StyledButton>
      );
    }
    return null;
  };

  const columnDefs = [
    { headerName: 'לקיחת משלוח', field: 'OrderId', width: 130, cellRendererFramework: TakeDeliveryButton },
    { headerName: 'לסיים משלוח', field: 'OrderId', width: 130, cellRendererFramework: FinishDeliveryButton },
    { headerName: 'מחיקת משלוח', field: 'OrderId', width: 130, cellRendererFramework: DeleteDeliveryButton },
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

  const filteredDeliveries = deliveries.filter((delivery) => {
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

  return (
    <StyledPage>
      <TopBar />
      <StyledDeliveries>
        <StyledSearch>
          <StyledSearchBox
            type="text"
            placeholder="חיפוש"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </StyledSearch>
        <StyledCollection>
          <StyledTitleCollection>משלוחים</StyledTitleCollection>
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
          {isTakingDeliveryPopupOpen && (
            <TakingDelivery
              userName={user.UserName}
              orderId={selectedRowData.OrderId}
              onClose={handleCloseTakingPopup}
            />
          )}
          {isFinishDeliveryPopupOpen && (
            <CompleteDelivery
              orderId={selectedRowData.OrderId}
              onClose={handleCloseFinishPopup}
            />
          )}
          {isDeleteDeliveryPopupOpen && (
            <DeleteReqPopup
              orderId={selectedRowData.OrderId}
              onClose={handleCloseDeletePopup}
            />
          )}
        </StyledCollection>
        <StyledFooter>זכויות יוצרים © 2023 ItamarChen. כל הזכויות שמורות</StyledFooter>
      </StyledDeliveries>
    </StyledPage>
  );
}