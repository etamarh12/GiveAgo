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

function CompleteDelivery(props) {
    const [orderId, setOrderId] = useState("");
    let EndedTime = new Date().toLocaleString()
    const popUpClose = () => {
        props.onClose();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { orderId, EndedTime };
            await axios.post('http://localhost:3001/api/orders/comDelivery', formData);
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
    const isSubmitDisabled = !orderId;

    return (
        <StyledPopUp>
            <StyledPopUpContent>
                <h2>השלמת משלוח</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledLabel>: מספר סידורי</StyledLabel>
                    <StyledInput onChange={e => setOrderId(e.target.value)}></StyledInput>
                    <StyledButton disabled={isSubmitDisabled} >אישור</StyledButton>
                </StyledForm>
                <StyledButton onClick={popUpClose}>סגירה</StyledButton>
            </StyledPopUpContent>
        </StyledPopUp>
    )
};
export default CompleteDelivery;