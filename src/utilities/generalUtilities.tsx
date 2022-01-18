import { toastConfigConstants } from "../constants";

export function isEmpty(value: any) {
  return (
    // null or undefined
    value === null ||
    value === undefined ||
    // has length and it's zero
    (Object.prototype.hasOwnProperty.call(value, "length") && value.length === 0) ||
    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}

export function displayToastMessage({ type, title, message }: { type: string; title: string; message: string }) {
  const dataToSend = {
    type,
    title,
    message,
    timeout: 3000,
  };
  const toastDispatcher = new CustomEvent(toastConfigConstants.toastEvent, {
    detail: dataToSend,
  });
  globalThis && globalThis.dispatchEvent(toastDispatcher);
}

// export function displaySuccessToastMessage(title: string, message: string, timer: number = 5000) {
//   setTimeout(() => {

//   }, timer);
// }

// export function displayErrorToastMessage(title: string, message: string, timer: number = 5000) {
//   setTimeout(() => {

//   }, timer);
// }
