import styled from 'styled-components';

export const StyledPopUp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  `;

export const StyledPopUpContent = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
`;

export const StyledLabel = styled.label`
  background-color: hsla(0,0%,100%,0);
  color: #212121;
  font-size: 30px;
  height: auto;
  text-align: right;
  width: 335px;
`;

export const StyledInput = styled.textarea`
  background-color: #fff;
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  height: 45px;
  width: 330px;
  font-family: 'Heebo',sans-serif;
  font-size: 20px;
  margin-bottom: 5%;
  text-align: right;
  word-break: break-word;
  white-space: pre-wrap;
  resize: none;
`;

export const StyledForm = styled.form`
  margin-top: 5%;
  display: flex;
  flex-direction: column; 
  align-items: center;
`;

export const StyledButton = styled.button`
  margin:10px;
  border-radius: 50px;
  border: none;
  width:300px;
  box-shadow: 0 0 10px rgb(0 0 0 / 50%);
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
export const StyledSelect = styled.select`
  background-color: #fff;
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  height: 45px;
  width: 330px;
  font-family: 'Heebo',sans-serif;
  font-size: 20px;
  margin-bottom: 5%;
  text-align: right;
  word-break: break-word;
  white-space: pre-wrap;
  resize: none;
`;