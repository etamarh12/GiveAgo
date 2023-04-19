import styled from 'styled-components';

export const StyledLogin = styled.div`
margin-top: 10px;
display: flex;
flex-direction: column; 
align-items: center;
font-family: 'Heebo', sans-serif;
`;

export const StyledTitle = styled.span`
font-size: 26px;
line-height: 34px;
text-align: center;
top: 175px;
width: 335px;
margin-bottom: 30px;
`;

export const StyledForm = styled.form`
margin-top: 2%;
display: flex;
flex-direction: column; 
width: fit-content;  
align-items: center;
padding: 3%;
border-radius: 10px;
box-shadow: 0px 0px 8px 0px #000000;
`;

export const StyledInput = styled.input`
background-color: #fff;
border: 1px solid #cbcbcb;
border-radius: 4px;
height: 45px;
width: 330px;
text-align: right;
font-size: 18px;
margin-bottom: 5%;
padding: 0 3%;
`;

export const StyledButton = styled.button`
  margin:10px;
  border-radius: 50px;
  border: none;
  width:300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  padding: 15px 60px;
  background-color: ${({ bg }) => bg || '#fff'};
  color: ${({ color }) => color || '#333'};

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;

export const StyledLabel = styled.label`
  background-color: hsla(0,0%,100%,0);
    color: #212121;
    font-size: 30px;
    height: auto;
    text-align: right;
    width: 335px;
    `;

export const StyledFooter = styled.footer`
    height: auto;
    width: 400px;
    text-align: right;    
    `;
export const StyledLogo = styled.img`
width: 80%;
border-radius: 30px;
`;