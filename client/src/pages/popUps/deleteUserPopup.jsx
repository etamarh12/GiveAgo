import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function DeleteUserPopup({ userName, userId, onClose }) {
  useEffect(() => {
    const deleteUser = async () => {
      try {
        const formData = { userName, userId };
        await axios.post('http://localhost:3001/api/users/delUser', formData);
        Swal.fire('משתמש נמחק בהצלחה', '', 'success');
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        Swal.fire('שגיאה במחיקת המשתמש', '', 'error');
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    const showConfirmationDialog = () => {
      Swal.fire({
        title: 'מחיקת משתמש',
        text: `האם אתה בטוח שברצונך למחוק את המשתמש: ${userName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'אישור',
        cancelButtonText: 'ביטול',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser();
        } else {
          onClose();
        }
      });
    };

    showConfirmationDialog();
  }, [userName, userId, onClose]);

  return null;
}

export default DeleteUserPopup;
