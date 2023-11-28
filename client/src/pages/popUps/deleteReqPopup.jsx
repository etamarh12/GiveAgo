import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function DeleteReqPopup({ orderId, onClose }) {

    useEffect(() => {
        const DeleteDelivery = async () => {
            try {
                await axios.post('http://localhost:3001/api/orders/deleteDelivery', {orderId});
                Swal.fire('בקשה נשלחה בהצלחה', '', 'success');
                onClose();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                Swal.fire('שגיאה בבקשה', '', 'error');
                onClose();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        };

        const showConfirmationDialog = () => {
            Swal.fire({
                title: 'מחיקת משלוח',
                text: 'האם אתה בטוח שברצונך למחוק את המשלוח?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'אישור',
                cancelButtonText: 'ביטול',
            }).then((result) => {
                if (result.isConfirmed) {
                    DeleteDelivery();
                } else {
                    onClose();
                }
            });
        };

        showConfirmationDialog();
    }, [orderId, onClose]);
    return null;
}
export default DeleteReqPopup;