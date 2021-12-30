import type { ServiceTypes } from "../types";

class ServiceHelper {
  curateUsersReactionList(
    users: ServiceTypes.User[],
    reactions: ServiceTypes.Reaction[],
    userReactions: ServiceTypes.UserContentReaction[]
  ) {
    for (const i of users) {
      for (const j of userReactions) {
        if (i.id === j.user_id) {
          i["content_id"] = j.content_id;
          i["reaction_id"] = j.reaction_id;
        }
      }
    }
    for (const i of users) {
      for (const j of reactions) {
        if (i.reaction_id === j.id) {
          i["emoji"] = j.emoji;
          i["name"] = j.name;
        }
      }
    }
    return users;
  }

  // addReactions(users: ServiceTypes.User[], reactions: ServiceTypes.Reaction[]) {
  //   for (const user of users) {
  //     let random = Math.floor(Math.random() * reactions.length);
  //     user["emoji"] = reactions[random].emoji;
  //     user["name"] = reactions[random].name;
  //   }
  //   return users;
  // }

  createSummaryTabs(usersContentReaction: ServiceTypes.User[]) {
    const usersWithReaction = usersContentReaction.filter((user) => user.emoji);
    let userReactions: ServiceTypes.Reaction[] = [];
    for (const user of usersWithReaction) {
      userReactions = [
        ...userReactions,
        {
          ["emoji"]: user.emoji,
          ["id"]: user.reaction_id,
          ["name"]: user.name,
          ["content_id"]: user.content_id,
          ["current"]: false,
        },
      ];
    }
    return userReactions || [];
  }

  // createSummaryTabs(reactions: ServiceTypes.Reaction[]) {
  //   let tabs: any = {};
  //   for (const reaction of reactions) {
  //     if (reaction?.name) {
  //       tabs[reaction.name] = reaction;
  //       tabs[reaction.name].current = false;
  //       tabs[reaction.name].emoji = this.getMappedEmoji(reaction.name);
  //     }
  //   }
  //   return tabs;
  // }

  // private getMappedEmoji(name: string) {
  //   switch (name) {
  //     case "Angry":
  //       return ThumbsUpIcon;
  //     case "Haha":
  //       return ThumbsUpIcon;
  //     case "Like":
  //       return ThumbsUpIcon;
  //     case "Love":
  //       return LoveIcon;
  //     case "Sad":
  //       return ThumbsUpIcon;
  //     case "Wow":
  //       return ThumbsUpIcon;
  //   }
  // }
}

export default new ServiceHelper();
