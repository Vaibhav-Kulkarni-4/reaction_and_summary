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

export async function getUserReactionsMapping() {
  try {
    return await httpHandler.makeRequest({
      url: "/user_content_reactions",
    });
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function updateReactionsForPost({ user_id, reaction_id, content_id }: { user_id: number; reaction_id: number; content_id: number }) {
  try {
    return await httpHandler.makeRequest({
      url: "/user_content_reactions",
      method: "POST",
      data: {
        user_id,
        reaction_id,
        content_id,
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function deleteReactionForPost({ id }: { id: number }) {
  try {
    return await httpHandler.makeRequest({
      url: "/user_content_reactions",
      params: {
        id,
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
}
