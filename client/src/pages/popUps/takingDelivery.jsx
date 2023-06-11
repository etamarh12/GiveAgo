import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function TakingDelivery({ userName, orderId, onClose }) {
  useEffect(() => {
    const takeDelivery = async () => {
      try {
        const formData = { userName, orderId };
        console.log(formData)
        await axios.post('http://localhost:3001/api/orders/takeDelivery', formData);
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
        title: 'לקיחת משלוח',
        text: 'האם אתה בטוח שברצונך לקחת משלוח?',
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
  }, [userName, orderId, onClose]);

  return null;
}

export default TakingDelivery;