import React, { useState } from 'react';
import axios from 'axios';
import {
    StyledPopUp,
    StyledPopUpContent,
    StyledLabel,
    StyledInput,
    StyledForm,
    StyledButton,
    StyledSelect
} from './popUp.styled'
import Swal from 'sweetalert2'

function CreateUserPopup(props) {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userType, setUserType] = useState("M");
    const [userBusinessId, setUserBusinessId] = useState(0);

    const popUpClose = () => {
        props.onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { userName, userPassword, userType, userBusinessId };
            console.log(userType)
            await axios.post('http://localhost:3001/api/users/newUser', formData);
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

    const isSubmitDisabled = !userName || !userPassword;

    return (
        <StyledPopUp>
            <StyledPopUpContent>
                <h2>יצירת משתמש</h2>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledLabel>שם משתמש :</StyledLabel>
                    <StyledInput onChange={e => setUserName(e.target.value)}></StyledInput>
                    <StyledLabel>סיסמה :</StyledLabel>
                    <StyledInput onChange={e => setUserPassword(e.target.value)}></StyledInput>
                    <StyledLabel>סוג :</StyledLabel>
                    <StyledSelect onChange={e => setUserType(e.target.value)}>
                        <option value="M">מנהל</option>
                        <option value="D">שליח</option>
                        <option value="B">בעל עסק</option>
                    </StyledSelect>
                {userType === 'B' || userType === 'D' ? (
                    <>
                        <StyledLabel>מספר עסק</StyledLabel>
                        <StyledInput type="number" onChange={(e) => setUserBusinessId(e.target.value)} />
                    </>
                ) : null}
                <StyledButton disabled={isSubmitDisabled} >אישור</StyledButton>
            </StyledForm>
            <StyledButton onClick={popUpClose}>סגירה</StyledButton>
        </StyledPopUpContent>
        </StyledPopUp >
    )
};
export default CreateUserPopup;