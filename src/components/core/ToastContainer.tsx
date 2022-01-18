import { useEffect, useState } from "react";

import ErrorToast from "./ErrorToast";
import SuccessToast from "./SuccessToast";
import { toastConfigConstants } from "../../constants";

export default function ToastContainer() {
  const [toasts, setToasts] = useState<
    {
      id: string;
      title: string;
      message: string;
      type: string;
      duration: number;
    }[]
  >([]);

  function generateID() {
    return `${Date.now()}_${Math.random()}`;
  }

  useEffect(() => {
    globalThis &&
      globalThis.addEventListener(toastConfigConstants.toastEvent, (event: any) => {
        event.stopPropagation();
        setToasts((toast) => [
          ...toast,
          {
            id: generateID(),
            title: event.detail.title,
            message: event.detail.message,
            type: event.detail.type,
            duration: event.detail.timeout,
          },
        ]);
      });
  }, []);

  return (
    <>
      {toasts.map((toast) => {
        return toast.type === "Success" ? <SuccessToast key={toast.id} toast={toast} /> : <ErrorToast key={toast.id} toast={toast} />;
      })}
    </>
  );
}
