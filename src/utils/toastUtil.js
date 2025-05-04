import { toast } from 'react-toastify';

export const showSuccess = (message) => {
  toast.success(message, {
    icon: '✅',
    theme: 'colored',
    autoClose: 3000,
  });
};

export const showError = (message) => {
  toast.error(message, {
    icon: '❌',
    theme: 'colored',
    autoClose: 3000,
  });
};

export const showInfo = (message) => {
  toast.info(message, {
    icon: 'ℹ️',
    theme: 'colored',
    autoClose: 3000,
  });
};

export const showWarning = (message) => {
  toast.warning(message, {
    icon: '⚠️',
    theme: 'colored',
    autoClose: 3000,
  });
};
