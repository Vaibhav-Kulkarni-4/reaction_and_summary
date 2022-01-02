import type { ServiceTypes } from "../types";

class ReactionPostHelpers {
  getReactionsCountForPost(contentReactionMapping: ServiceTypes.UserContentReaction[]) {
    let reactionsCountObject: {
      [key: number]: number;
    } = {};
    for (const i of contentReactionMapping) {
      reactionsCountObject[i.reaction_id] = 0;
    }

    contentReactionMapping.forEach((i) => {
      let count = 0;
      Object.keys(reactionsCountObject).forEach((j) => {
        if (i.reaction_id === Number(j)) {
          count += 1;
          reactionsCountObject[i.reaction_id] = reactionsCountObject[i.reaction_id] + count;
        }
      });
    });
    return reactionsCountObject;
  }

  getUsersCountForReaction(contentReactionMapping: ServiceTypes.UserContentReaction[], contentId: number) {
    const userReactionContentMapping = contentReactionMapping.filter((i) => i.content_id === contentId);
    let usersForCurrentContent: any = {};
    usersForCurrentContent["All"] = [];

    for (const map of userReactionContentMapping) {
      if (!usersForCurrentContent[map.reaction_id]) {
        usersForCurrentContent[map.reaction_id] = [];
      }
      usersForCurrentContent[map.reaction_id]["current"] = false;
      usersForCurrentContent[map.reaction_id].push(map);
      usersForCurrentContent["All"].push(map);
      usersForCurrentContent["All"]["current"] = false;
    }
    return usersForCurrentContent;
  }

  getUsersForReactionTab(usersList: ServiceTypes.User[], reactionsList: ServiceTypes.Reaction[], selectedTabDetails: any) {
    let finalData: ServiceTypes.User[] = [];
    for (const i of selectedTabDetails) {
      for (const user of usersList) {
        if (i.user_id === user.id) {
          user["emoji"] = this.getReactionEmoji(reactionsList, i.reaction_id);
          finalData = [...finalData, user];
        }
      }
    }
    return finalData;
  }

  getReactionEmoji(reactionsList: ServiceTypes.Reaction[], reactionId: number) {
    return reactionsList.filter((reaction) => reaction.id === reactionId)[0]?.emoji;
  }
}

export default new ReactionPostHelpers();
