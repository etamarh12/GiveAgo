import styled from 'styled-components';

export const StyledTopBar = styled.div`
    display: flex;
    border-radius: 5px;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
`;

export const StyledButton = styled.button`
border-radius: 50px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 500;
    padding: 11px 16px;
    color: #fff;
    background-color: #23226b00;

  &:hover {
    opacity: 1;
    transform: scale(0.98);
    color: #3370ff;
    background-color: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 15%);
  }
`;

export const StyledTitle = styled.span`
font-size: 26px;
text-align: center;
`;

export const StyledLogo = styled.img`
width: 100%;
`;

export const StyledGroupOfBtn = styled.div`
display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
`;