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


//import { getUserActionsByType } from './topBarHelper/helper';
import { useUserOptionsByType } from './topBarHelper/helper';
import { logoutUser } from '.././../actions/loginActions';


function TopBar() {
  //const [showPopUp, setShowPopUp] = useState('');
  const user = useSelector(state => state.login.user);
  // const userActions = getUserActionsByType(user.AccountType);
  const userOptions = useUserOptionsByType(user.AccountType);
  const dispatch = useDispatch();


  const handleDisconnect = () => {
    dispatch(logoutUser());
  };

  // const openPopUp = (name) => {
  // setShowPopUp(name);
  // };

  // const closePopUp = () => {
  //  setShowPopUp('');
  // };


  return (
    <StyledTopBar className='mainTopBar'>
      {/* {userActions.map(({ name, popup: ActionPopup, title }) => (
        <div key={name}>
          <StyledButton onClick={() => openPopUp(name)}>{title}</StyledButton>
          {showPopUp === name && <ActionPopup onClose={closePopUp} />}
        </div>
      ))} */}
      <div><StyledLogo src={companyLogo} alt="logo" /></div>
      <StyledGroupOfBtn>
        {userOptions.map(({ title, name }) => (
          <Link key={name} to={`/${name}`}>
            <StyledButton>{title}</StyledButton>
          </Link>
        ))}
      </StyledGroupOfBtn>
      <StyledButton style={{ background: '#3370ffb9', fontSize: '12px' }} onClick={handleDisconnect}>התנתקות</StyledButton>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={faceIcon} alt="icon" style={{ width: '50%', marginBottom: '10%' }} />
        <strong style={{ color: ' #00268c', fontSize: '17px' }}>{user.UserName} </strong>
      </div>
    </StyledTopBar>

  );
};

export default TopBar;