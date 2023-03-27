import { toast } from 'react-toastify';

const ToastSuccess = (notification) => {
    toast.success(notification, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 2000
      });
}

const ToastWarning = (notification) => {
    toast.warn(notification, {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
        autoClose: 3000,
      });
}

export { ToastSuccess, ToastWarning };

