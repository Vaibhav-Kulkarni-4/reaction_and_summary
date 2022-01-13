import axios, { Method, ResponseType } from "axios";

import type { ServiceTypes } from "../types";
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
    const updatedReactionResponse = await httpHandler.makeRequest({
      url: "/user_content_reactions",
      method: "POST",
      data: {
        user_id,
        reaction_id,
        content_id,
      },
    });

    return {
      ok: true,
      data: updatedReactionResponse?.data,
    };
  } catch (err: any) {
    return {
      ok: false,
      data: err.message,
    };
  }
}

export async function deleteReactionForPost({ id }: { id: number }) {
  try {
    const deletedReactionResponse = await httpHandler.makeRequest({
      url: "/user_content_reactions",
      method: "DELETE",
      data: {
        id,
      },
    });
    return {
      ok: true,
      data: deletedReactionResponse?.data,
    };
  } catch (err: any) {
    return {
      ok: false,
      data: err.message,
    };
  }
}
