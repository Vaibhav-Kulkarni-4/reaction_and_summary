import axios, { Method, ResponseType } from "axios";

const instance = axios.create({
  baseURL: "https://artful-iudex.herokuapp.com/",
  timeout: 0,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

export function makeRequest({
  url,
  method = "GET", // By default
  params = {}, // For GET method, send content in params object
  data = {}, // For POST method, send content in data object
  responseType = "json",
}: {
  url: string;
  method?: Method;
  params?: any;
  data?: any;
  responseType?: ResponseType;
}) {
  return instance.request({
    url,
    method,
    params,
    data,
    responseType,
  });
}
