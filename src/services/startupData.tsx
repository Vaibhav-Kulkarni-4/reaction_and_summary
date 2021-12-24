import { httpHandler } from "../utilities";

export async function getUsers() {
  try {
    return await httpHandler.makeRequest({ url: "/users" });
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function getReactions() {
  try {
    return await httpHandler.makeRequest({
      url: "/reactions",
    });
  } catch (err: any) {
    console.log(err.message);
  }
}
