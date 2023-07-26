import { toast, ToastOptions } from "react-toastify";

type NotificationType = {
  INFO: string;
  SUCCESS: string;
  WARNING: string;
  ERROR: string;
  DEFAULT: string;
};

type DefaultToastOptionsType = {
  position: typeof toast.POSITION.BOTTOM_RIGHT;
  theme: "dark" | "light" | "colored";
};

const useSnackbar = () => {
  const NOTIFICATION_TYPE: NotificationType = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    DEFAULT: "default",
  };

  const defaultToastOptions: DefaultToastOptionsType = {
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: "dark",
  };

  const showNotification = (type: string, message: string, options?: ToastOptions) => {
    {
      type === NOTIFICATION_TYPE.SUCCESS &&
        toast.success(message, {
          ...defaultToastOptions,
          ...options,
        });
    }
    {
      type === NOTIFICATION_TYPE.WARNING &&
        toast.warning(message, {
          ...defaultToastOptions,
          ...options,
        });
    }
    {
      type === NOTIFICATION_TYPE.ERROR &&
        toast.error(message, {
          ...defaultToastOptions,
          ...options,
        });
    }
    {
      type === NOTIFICATION_TYPE.INFO &&
        toast.info(message, {
          ...defaultToastOptions,
          ...options,
        });
    }
    {
      type === NOTIFICATION_TYPE.DEFAULT &&
        toast(message, {
          ...defaultToastOptions,
          ...options,
        });
    }
  };

  return { showNotification, NOTIFICATION_TYPE };
};

export default useSnackbar;
