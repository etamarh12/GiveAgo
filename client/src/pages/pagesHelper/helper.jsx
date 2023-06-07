import CreateReqPopup from '.././popUps/createReqPopup'
import DeleteReqPopup from '.././popUps/deleteReqPopup'
import CreateUserPopup from '.././popUps/createUserPopup'
import DeleteUserPopup from '.././popUps/deleteUserPopup'
import CompleteDelivery from '.././popUps/completeDelivery'
import TakingDelivery from '.././popUps/takingDelivery'

export const getUserActionsByType = (accountType) => {
    switch (accountType) {
        case 'M':
            return [
                { name: 'createReq', popup: CreateReqPopup, title: 'Create Request' },
                { name: 'deleteReq', popup: DeleteReqPopup, title: 'Delete Request' },
                { name: 'createUser', popup: CreateUserPopup, title: 'Create User' },
                { name: 'deleteUser', popup: DeleteUserPopup, title: 'Delete User' },
                { name: 'completeDel', popup: CompleteDelivery, title: 'Complete Delivery' },
                { name: 'TakingDel', popup: TakingDelivery, title: 'Taking Delivery' },
            ];

        case 'D':
            return [
                { name: 'completeDel', popup: CompleteDelivery, title: 'Complete Delivery' },
                { name: 'TakingDel', popup: TakingDelivery, title: 'Taking Delivery' },
            ];

        case 'B':
            return [
                { name: 'createReq', popup: CreateReqPopup, title: 'Create Request' }
            ];

        default:
            return [];
    }
};
