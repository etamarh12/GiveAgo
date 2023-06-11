import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CompleteDelivery({ orderId, onClose }) {
    let EndedTime = new Date().toLocaleString()
    useEffect(() => {
        const takeDelivery = async () => {
            try {
                let EndedTime = new Date().toLocaleString()
                const formData = { orderId, EndedTime };   
                console.log(formData)
                await axios.post('http://localhost:3001/api/orders/comDelivery', formData);
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
                title: 'סיום משלוח',
                text: 'האם אתה בטוח שברצונך לסגור את המשלוח?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'אישור',
                cancelButtonText: 'ביטול',
            }).then((result) => {
                if (result.isConfirmed) {
                    takeDelivery();
                } else {
                    onClose();
                }
            });
        };

        showConfirmationDialog();
    }, [orderId, EndedTime, onClose]);

    return null;
}

export default CompleteDelivery;