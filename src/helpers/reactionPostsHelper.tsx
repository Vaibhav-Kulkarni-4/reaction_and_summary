import type { ServiceTypes } from "../types";

class ReactionPostHelper {
  getReactionsCountForPost(
    userList: ServiceTypes.User[],
    reactions: ServiceTypes.Reaction[]
  ) {
    let reactionsCount: {
      [key: string]: number;
    } = {};
    for (const i of reactions) {
      reactionsCount[i.emoji] = 0;
    }

    userList.forEach((i) => {
      let count = 0;
      Object.keys(reactionsCount).forEach((j) => {
        if (i.emoji === j) {
          count += 1;
          reactionsCount[i.emoji] = reactionsCount[i.emoji] + count;
        }
      });
    });
    return reactionsCount;
  }
}

export default new ReactionPostHelper();
