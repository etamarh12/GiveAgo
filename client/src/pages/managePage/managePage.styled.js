import styled from 'styled-components';

export const StyledPage = styled.div`
display: flex;
flex-direction: column;
`;

export const StyledManage = styled.div`
margin-top: 5px;
display: flex;
font-family: 'Heebo',sans-serif;
width: 100%;
flex-direction: column;
`;

export const StyledFooter = styled.footer`
height: auto;
`;

export const StyledTitleCollection = styled.header`
font-size: 30px;
text-align: center;
background: #00c8ff2b;
white-space: break-spaces;
padding: 15px;
margin-bottom: 50px;
border-radius: 10px;
`;
export const StyledButton = styled.button`
    display: inline-block;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    background-color: #009293;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
    :hover {
  background-color: #267fa8;
  
}
`;
export const StyledSearchBox = styled.input`
background-color: #fff;
color: #666666;
font-size: 18.0px;
height: 30px;
width:30%;
border: 1px solid #666666;
border-radius: 5px;
margin-bottom: 20px;
text-align:center;
`;

export const StyledSearch = styled.div`
display:flex;
justify-content:center;
width: 100%;
`;

export const StyledShipCard = styled.form`
font-size: 26px;
margin-bottom: 30px;
border-bottom: 5px;
border-bottom: outset;
border-color: #00fff49c;
`;

export const StyledGroups = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: space-around;
`;
export const StyledCollection = styled.div`
background-color: #fff;
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
margin-bottom: 20px;
padding: 50px;


`;
export const StyledParagraph = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;  
  &.red {
    color: #f00606;
  }

  &.green {
    color: #11d811;
  }

  &.orange {
    color: #ff9300;
  }
`;
export const StyledLogo = styled.img`
width: 30%;
`;
export const StyledGroupOfBtn = styled.div`
 display: flex;
 gap: 10px;
  `;