import Swal from 'sweetalert2';

export const errorToast = (message, options = {}) => {
    return Swal.fire({
        icon: 'error',
        toast: true,
        position: 'top-right',
        title: 'Ошибка',
        text: message,
        showConfirmButton: false,
        customClass: {
            popup: 'exchange-error-toast'
        },
        timer: 5000,
        timerProgressBar: true,
        didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        ...options
    });
};

export const successPopup = (message, options = {}) => {
    return Swal.fire({
        icon: 'success',
        title: 'Успех!',
        text: message,
        showConfirmButton: true,
        confirmButtonColor: '#0086ff',
        confirmButtonText: 'Окей',
        // customClass: {
        //     popup: 'erp-success__popup'
        // },
        ...options
    });
};

export const confirmPopup = (message, options = {}) => {
    return Swal.fire({
        icon: 'question',
        title: 'Вы уверены?',
        text: message,
        showDenyButton: true,
        confirmButtonText: 'Подтвердить',
        denyButtonText: 'Отмена',
        confirmButtonColor: '#0086ff',
        // customClass: {
        //     popup: 'erp-confirm__popup'
        // },
        ...options
    });
};
