import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyledPopUp,
  StyledPopUpContent,
  StyledLabel,
  StyledInput,
  StyledForm,
  StyledButton
} from './popUp.styled'
import axios from 'axios';
import Swal from 'sweetalert2'

function CreateReqPopup(props) {
  const carrier = useSelector(state => state.login.user.UserName);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("אין");
  let AVAILABLE = "חדש";

  const popUpClose = () => {
    props.onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { customerName, customerAddress, AVAILABLE, customerNote, carrier, CreatedTime: new Date().toLocaleString() };
      await axios.post('http://localhost:3001/api/orders/newDelivery', formData);
    } catch (error) {
      console.error(error); // log any errors
    }
    Swal.fire(
      'בקשה נשלחה בהצלחה',
      '',
      'success'
    )
    popUpClose();
    setTimeout(() => {
      window.location.reload();
    }, "2000");
  };

  const isSubmitDisabled = !customerName || !customerAddress;

  return (
    <StyledPopUp>
      <StyledPopUpContent>
        <h2>בקשת משלוח</h2>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>: שם הלקוח</StyledLabel>
          <StyledInput onChange={e => setCustomerName(e.target.value)}></StyledInput>
          <StyledLabel>: כתובת</StyledLabel>
          <StyledInput onChange={e => setCustomerAddress(e.target.value)}></StyledInput>
          <StyledLabel>: הערות</StyledLabel>
          <StyledInput onChange={e => setCustomerNote(e.target.value)} style={{ height: '90px' }} ></StyledInput>
          <StyledButton disabled={isSubmitDisabled} type="submit">אישור</StyledButton>
        </StyledForm>
        <StyledButton onClick={popUpClose}>סגירה</StyledButton>
      </StyledPopUpContent>
    </StyledPopUp>
  )
};

export default CreateReqPopup;