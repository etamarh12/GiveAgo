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

function DeleteUserPopup(props) {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    const popUpClose = () => {
        props.onClose();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { userName, userId };
            await axios.post('http://localhost:3001/api/users/delUser', formData);
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
    const isSubmitDisabled = !userId || !userName;

    return (
        <StyledPopUp>
            <StyledPopUpContent>
                <h2>מחיקת משתמש</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledLabel>: שם משתמש</StyledLabel>
                    <StyledInput onChange={e => setUserName(e.target.value)}></StyledInput>
                    <StyledLabel>: מספר סידורי</StyledLabel>
                    <StyledInput onChange={e => setUserId(e.target.value)}></StyledInput>
                    <StyledButton disabled={isSubmitDisabled} >אישור</StyledButton>
                </StyledForm>
                <StyledButton onClick={popUpClose}>סגירה</StyledButton>
            </StyledPopUpContent>
        </StyledPopUp>
    )
};
export default DeleteUserPopup;