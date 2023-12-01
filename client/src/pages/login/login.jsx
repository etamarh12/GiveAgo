import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchLogin } from '../../actions/loginActions';
import { MutatingDots } from 'react-loader-spinner'
import {
  StyledLogin,
  StyledTitle,
  StyledForm,
  StyledButton,
  StyledInput,
  StyledLabel,
  StyledFooter,
  StyledLogo,
  StyledField
} from './login.styled';
import giveagoLogin from '../../img/giveagoLogin.png'

export function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.login);

  const requestLogin = async () => {
    dispatch(fetchLogin(userName, password)).then(() => {
      if (loginState.isLoggedIn) {
        navigate('/homepage');
      }
    });
  };

  return (
    <StyledLogin>
      <StyledForm>
        <StyledTitle><StyledLogo src={giveagoLogin} alt="logo" /></StyledTitle>
        <StyledField>
          <StyledLabel>שם משתמש :</StyledLabel>
          <StyledInput type="text" placeholder="הזן משתמש" onChange={e => setUserName(e.target.value)} />
        </StyledField>
        <StyledField>
          <StyledLabel>סיסמה :</StyledLabel>
          <StyledInput type="password" placeholder="הזן סיסמה" onChange={e => setPassword(e.target.value)} />
        </StyledField>
        <StyledButton onClick={requestLogin} disabled={!password || !userName || loginState.loading}>כניסה</StyledButton>
        {loginState.loading && <MutatingDots
          height="100"
          width="100"
          color="#3370ff"
          secondaryColor='#467dfe'
          radius='12.5'
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />}
        {loginState.error && <div>{loginState.error}</div>}
      </StyledForm>
      <StyledFooter>זכויות יוצרים © 2023 ItamarChen. כל הזכויות שמורות</StyledFooter>
    </StyledLogin>
  );
}