import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyledTopBar,
  StyledButton,
  StyledLogo,
  StyledGroupOfBtn
} from './topBar.styled';
import companyLogo from '../../img/giveago.png'
import faceIcon from '../../img/icon.png'
import { Link } from 'react-router-dom';
import { useUserOptionsByType } from './topBarHelper/helper';
import { logoutUser } from '.././../actions/loginActions';

function TopBar() {
  const user = useSelector(state => state.login.user);
  const userOptions = useUserOptionsByType(user.AccountType);
  const dispatch = useDispatch();

  const handleDisconnect = () => {
    dispatch(logoutUser());
  };

  return (
    <StyledTopBar className='mainTopBar'>
      <div><StyledLogo src={companyLogo} alt="logo" /></div>
      <StyledGroupOfBtn>
        {userOptions.map(({ title, name }) => (
          <Link key={name} to={`/${name}`}>
            <StyledButton>{title}</StyledButton>
          </Link>
        ))}
      </StyledGroupOfBtn>
      <StyledButton style={{ background: '#3370ffb9', fontSize: '12px' }} onClick={handleDisconnect}>התנתקות</StyledButton>
      <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <img src={faceIcon} alt="icon" style={{ width: '25%'}} />
        <strong style={{ color: ' #00268c', fontSize: '17px' }}>{user.UserName} </strong>
      </div>
    </StyledTopBar>
  );
};

export default TopBar;