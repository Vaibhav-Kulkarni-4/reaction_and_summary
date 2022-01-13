import ErrorToast from "../components/core/ErrorToast";
import SuccessToast from "../components/core/SuccessToast";

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

export function displayToastMessage(type: string = "", title: string = "", message: string = "") {
  if (type === "success") {
    return <SuccessToast title={title} message={message} />;
  } else if (type === "error") {
    return <ErrorToast title={title} message={message} />;
  } else {
    return <></>;
  }
}

// export function displaySuccessToastMessage(title: string, message: string, timer: number = 5000) {
//   setTimeout(() => {

//   }, timer);
// }

// export function displayErrorToastMessage(title: string, message: string, timer: number = 5000) {
//   setTimeout(() => {

//   }, timer);
// }
