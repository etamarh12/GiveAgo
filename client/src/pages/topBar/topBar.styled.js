import styled from 'styled-components';

export const StyledTopBar = styled.div`
background: #00ffea80;
display: flex;
justify-content: space-between;
align-items: baseline;
flex-direction: row-reverse;
padding: 10px;
border-radius: 5px;
`;

export const StyledButton = styled.button`
border-radius: 50px;
border: none;
box-shadow: 0 0 10px rgb(0 0 0 / 15%);
cursor: pointer;
font-size: 15px;
font-weight: 600;
padding: 11px 16px;
background-color: #fff;
color: #333;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;

export const StyledTitle = styled.span`
font-size: 26px;
text-align: center;
`;