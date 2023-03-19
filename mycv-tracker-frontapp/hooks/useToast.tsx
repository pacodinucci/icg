import { useContext, createContext, useState, useCallback, ReactElement } from "react";

import { Toast, ToastHeader, ToastBody } from "reactstrap";

type ContextType = {
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
};

const ToastContext = createContext<ContextType>({
  showSuccessToast: () => {},
  showErrorToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactElement }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "error",
  });

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: "", type: "success" });
  }, []);

  const showSuccessToast = useCallback(
    (message: string) => {
      setToast({ visible: true, message, type: "success" });
      setTimeout(() => hideToast(), 3000);
    },
    [hideToast]
  );
  const showErrorToast = useCallback(
    (message: string) => {
      setToast({ visible: true, message, type: "error" });
      setTimeout(() => hideToast(), 3000);
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ showSuccessToast, showErrorToast }}>
      <>
        {children}
        <Toast isOpen={toast.visible} className="position-fixed top-0 end-0 m-3" style={{zIndex: 99999}}>
          <ToastHeader
            toggle={hideToast}
            className={`${toast.type === "error" ? "bg-danger" : "bg-success"} text-bg-success`}
          >
            {toast.type === "error" ? "Error" : "Success"}
          </ToastHeader>
          <ToastBody>{toast.message}</ToastBody>
        </Toast>
      </>
    </ToastContext.Provider>
  );
};
