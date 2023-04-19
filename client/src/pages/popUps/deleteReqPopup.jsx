import React, { useState } from 'react';
import axios from 'axios';
import {
    StyledPopUp,
    StyledPopUpContent,
    StyledLabel,
    StyledInput,
    StyledForm,
    StyledButton
} from './popUp.styled'
import Swal from 'sweetalert2'

function DeleteReqPopup(props) {
    const [deliveryId, setDeliveryId] = useState("");

    const popUpClose = () => {
        props.onClose();
        setTimeout(() => {
            window.location.reload();
        }, "2000");

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { deliveryId };
            await axios.post('http://localhost:3001/api/orders/deleteDelivery', formData);
        } catch (error) {
            console.error(error); // log any errors
        }
        Swal.fire(
            'בקשה נשלחה בהצלחה',
            '',
            'success'
        )
        popUpClose();
    };

    const isSubmitDisabled = !deliveryId;

    return (
        <StyledPopUp>
            <StyledPopUpContent>
                <h2>מחיקת משלוח</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledLabel>: מספר שילוח</StyledLabel>
                    <StyledInput type="number" onChange={e => setDeliveryId(e.target.value)}></StyledInput>
                    <StyledButton disabled={isSubmitDisabled} >אישור</StyledButton>
                </StyledForm>
                <StyledButton onClick={popUpClose}>סגירה</StyledButton>
            </StyledPopUpContent>
        </StyledPopUp>
    )
};
export default DeleteReqPopup;