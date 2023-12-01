import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  StyledManage,
  StyledFooter,
  StyledSearch,
  StyledPage,
  StyledSearchBox,
  StyledCollection,
  StyledTitleCollection,
  StyledButton,
  StyledGroupOfBtn
} from './managePage.styled';
import TopBar from '../topBar/topBar';
import DeleteUserPopup from '../popUps/deleteUserPopup';
import CreateUserPopup from '../popUps/createUserPopup';

export function ManagePage() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isCreateUserPopupOpen, setIsCreateUserPopupOpen] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/allUsers');
      const usersArray = Object.values(response.data);
      setUsers(usersArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchLowercase = searchValue ? searchValue.toLowerCase() : '';
    const userName = user.UserName ? user.UserName.toLowerCase() : '';
    const userId = user.userId ? user.userId.toString().toLowerCase() : '';
    const businessId = user.businessId ? user.businessId.toString().toLowerCase() : '';
    return (
      userName.includes(searchLowercase) ||
      userId.includes(searchLowercase) ||
      businessId.includes(searchLowercase)
    );
  });

  const handleDeleteUser = (rowData) => {
    setSelectedRowData(rowData);
  };

  const handleCreateUser = () => {
    setIsCreateUserPopupOpen(true);
  };

  const RenderDeleteUserPopup = () => {
    if (selectedRowData) {
      return (
        <DeleteUserPopup
          userName={selectedRowData.UserName}
          userId={selectedRowData.userId}
          businessId={selectedRowData.businessId}
          onClose={() => setSelectedRowData(null)}
        />
      );
    }
    return null;
  };

  const RenderCreateUserPopup = () => {
    if (isCreateUserPopupOpen) {
      return <CreateUserPopup onClose={() => setIsCreateUserPopupOpen(false)} />;
    }
    return null;
  };

  const RenderAgGrid = () => {
    if (!selectedRowData && !isCreateUserPopupOpen) {
      return (
        <div className="ag-theme-alpine" style={{ height: '500px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={filteredUsers}
            enableFilter={true}
            enableSorting={true}
            enableRtl={true}
            suppressMenuHide={true}
          />
        </div>
      );
    }
    return null;
  };

  const DeleteUserButton = ({ data }) => (
    <StyledButton onClick={() => handleDeleteUser(data)}>מחיקה</StyledButton>
  );

  const columnDefs = [
    { headerName: 'שם משתמש', field: 'UserName', width: 200 },
    { headerName: 'מספר סידורי', field: 'userId', width: 150 },
    { headerName: 'מספר עסק', field: 'businessId', width: 150 },
    {
      headerName: 'מחיקת משתמש',
      field: 'deleteUser',
      width: 150,
      cellRendererFramework: DeleteUserButton,
    },
  ];

  return (
    <StyledPage>
      <TopBar />
      <StyledManage>
        <StyledSearch>
          <StyledSearchBox placeholder="חיפוש" value={searchValue} onChange={handleSearchChange} />
        </StyledSearch>
        <StyledCollection>
          <RenderDeleteUserPopup />
          <RenderCreateUserPopup />
          <StyledTitleCollection>אפשרויות מנהל</StyledTitleCollection>
          <StyledGroupOfBtn>
            <StyledButton onClick={handleCreateUser}>יצירת משתמש</StyledButton>
          </StyledGroupOfBtn>
          <RenderAgGrid />
        </StyledCollection>
        <StyledFooter>זכויות יוצרים © 2023 ItamarChen. כל הזכויות שמורות</StyledFooter>
      </StyledManage>
    </StyledPage>
  );
}

export default ManagePage;