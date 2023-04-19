import styled from 'styled-components';

export const StyledPage = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`;

export const StyledBusiness = styled.div`
margin-top: 5px;
display: flex;
font-family: 'Heebo',sans-serif;
border-style: ridge;
width: 100%;
flex-direction: column;
align-items: stretch;
`;

export const StyledFooter = styled.footer`
height: auto;
text-align: right;
width: 50%;    
`;

export const StyledHeader = styled.header`
font-size: 50px;
line-height: 16px;
text-align: right;
float: right;
padding: 5px;
white-space: break-spaces;
color: #000000c7;
`;

export const StyledSearch = styled.input`
background-color: #fff;
color: #666666;
font-size: 18.0px;
height: 30px;
border: 1px solid #666666;
border-radius: 5px;
text-align: right;
float:right;
`;

export const StyledShipCard = styled.form`
font-size: 26px;
text-align: right;
margin-bottom: 30px;
border-bottom: 5px;
border-bottom: outset;
border-color: #00fff49c;
`;
export const StyledCollection = styled.div`
background-color: #fff;
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
margin-bottom: 20px;
padding: 50px;
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

export const StyledParagraph = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
  text-align: right;
  direction: rtl;

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
border-radius: 30px;
`;