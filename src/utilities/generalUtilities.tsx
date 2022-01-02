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
