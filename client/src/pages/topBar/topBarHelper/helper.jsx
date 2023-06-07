import { useNavigate } from 'react-router';

export const useNavigationHandler = () => {
    const navigate = useNavigate();

    const handleNavigation = (name) => {
        switch (name) {
            case 'users':
                navigate('/manage'); // Navigate to ManagePage component
                break;
            case 'customers':
                navigate('/deliveries'); // Navigate to DeliveryPage component
                break;
            case 'business':
                navigate('/business'); // Navigate to BusinessPage component
                break;
            default:
                break;
        }
    };

    return handleNavigation;
};

export const useUserOptionsByType = (accountType) => {
    const handleNavigation = useNavigationHandler();

    switch (accountType) {
        case 'M':
            return [
                { title: 'דף הבית', name: 'home' },
                { title: 'תפריט מנהל', name: 'users', onClick: () => handleNavigation('users') },
                { title: 'משלוחים', name: 'deliveries', onClick: () => handleNavigation('deliveries') },
                { title: 'עסקים', name: 'business', onClick: () => handleNavigation('business') },
            ];

        case 'D':
            return [
                { title: 'דף הבית', name: 'home' },
                { title: 'משלוחים', name: 'deliveries', onClick: () => handleNavigation('deliveries') },
            ];

        case 'B':
            return [
                { title: 'דף הבית', name: 'home' },
                { title: 'עסקים', name: 'business', onClick: () => handleNavigation('business') },
            ];

        default:
            return [];
    }
};