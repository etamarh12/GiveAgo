import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledTopBar,
  StyledButton,
} from './topBar.styled';
import CreateReqPopup from '../popUps/createReqPopup'
import DeleteReqPopup from '../popUps/deleteReqPopup'
import CreateUserPopup from '../popUps/createUserPopup'
import DeleteUserPopup from '../popUps/deleteUserPopup'
import CompleteDelivery from '../popUps/completeDelivery'
import TakingDelivery from '../popUps/takingDelivery'



function TopBar() {
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(-1);
  const user = useSelector(state => state.login.user);

  const closePopUp = () => {
    setShowPopUp(-1);
  };

  const openPopUp = (popUpIndex) => () => {
    setShowPopUp(popUpIndex);
  };

  const popUps = [
    <CreateUserPopup onClose={closePopUp} />,
    <DeleteUserPopup onClose={closePopUp} />,
    <CreateReqPopup onClose={closePopUp} />,
    <DeleteReqPopup onClose={closePopUp} />,
    <CompleteDelivery onClose={closePopUp} />,
    <TakingDelivery onClose={closePopUp} />
  ];

  return (
    <StyledTopBar className='mainTopBar'>
      {user.AccountType === 'M' && (
        <div>
          <StyledButton onClick={openPopUp(0)}>יצירת משתמש</StyledButton>
          {showPopUp === 0 && popUps[0]}
        </div>
      )}
      {user.AccountType === 'M' && (
        <div>
          <StyledButton onClick={openPopUp(1)}>מחיקת משתמש</StyledButton>
          {showPopUp === 1 && popUps[1]}
        </div>
      )}
      {['M', 'B'].includes(user.AccountType) && (
        <div>
          <StyledButton onClick={openPopUp(2)}>יצירת משלוח</StyledButton>
          {showPopUp === 2 && popUps[2]}
        </div>
      )}
      {user.AccountType === 'M' && (
        <div>
          <StyledButton onClick={openPopUp(3)}>מחיקת משלוח</StyledButton>
          {showPopUp === 3 && popUps[3]}
        </div>
      )}
      {['M', 'D'].includes(user.AccountType) && (
        <div>
          <StyledButton onClick={openPopUp(4)}>השלמת משלוח</StyledButton>
          {showPopUp === 4 && popUps[4]}
        </div>
      )}
      {['M', 'D'].includes(user.AccountType) && (
        <div>
          <StyledButton onClick={openPopUp(5)}>לקיחת משלוח</StyledButton>
          {showPopUp === 5 && popUps[5]}
        </div>
      )}
      <div>
        <StyledButton onClick={() => dispatch({ type: 'LOGOUT' })}>התנתקות</StyledButton>
      </div>
    </StyledTopBar>
  );
}

export default TopBar;