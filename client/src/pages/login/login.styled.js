import styled from 'styled-components';

export const StyledLogin = styled.div`
height:100vh;
display: flex;
flex-direction: column; 
align-items: center;
font-family: 'Heebo', sans-serif;
box-sizing: border-box;
justify-content:center;
`;

export const StyledTitle = styled.div`
font-size: 26px;
line-height: 34px;
text-align: center;
top: 175px;
width: 100%;
margin-bottom: 30px;
`;

export const StyledForm = styled.form`
margin-top: 20px;
display: flex;
flex-direction: column; 
width: fit-content;  
align-items: center;
padding: 20px;
border-radius: 10px;
box-shadow: 0px 0px 8px 0px #000000;
max-width:100%;
width:350px;
justify-content:center;
margin-bottom:20px;
background-color:white;
`;

export const StyledInput = styled.input`
background-color: #fff;
border: 1px solid #cbcbcb;
border-radius: 4px;
height: 45px;
width: 100%;
font-size: 18px;
margin-bottom: 5%;
padding: 0 3%;
`;

export const StyledButton = styled.button`
  margin:10px;
  border-radius: 50px;
  border: none;
  width:100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  padding: 8px;
  background-color: #467dfe;
  color: white;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;

export const StyledLabel = styled.label`
  background-color: hsla(0,0%,100%,0);
    color: #212121;
    font-size: 16px;
    height: auto;
    width: 100%;
    font-weight: bold;
    `;

export const StyledFooter = styled.footer`
    height: auto;
    width: 350px;
    max-width: 100%;
    text-align:center;
    font-size:12px;
        `;
export const StyledLogo = styled.img`
width: 100%;
`;
export const StyledField = styled.div`
display: flex;
flex-direction:column;
align-items: flex-start;
width:100%;
`;