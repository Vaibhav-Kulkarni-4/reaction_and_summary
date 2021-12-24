import ClapsIcon from "../components/icons/ClapsIcon";
import LoveIcon from "../components/icons/LoveIcon";
import type { ServiceTypes } from "../types";
import ThumbsUpIcon from "../components/icons/ThumbsUpIcon";

class ServiceHelper {
  addReactions(users: ServiceTypes.User[], reactions: ServiceTypes.Reaction[]) {
    for (const user of users) {
      let random = Math.floor(Math.random() * reactions.length);
      user["emoji"] = reactions[random].emoji;
      user["name"] = reactions[random].name;
    }
    return users;
  }

  createSummaryTabs(reactions: ServiceTypes.Reaction[]) {
    let tabs: any = {};
    for (const reaction of reactions) {
      if (reaction?.name) {
        tabs[reaction.name] = reaction;
        tabs[reaction.name].current = false;
        tabs[reaction.name].emoji = this.getMappedEmoji(reaction.name);
      }
    }
    return tabs;
  }

  private getMappedEmoji(name: string) {
    switch (name) {
      case "Angry":
        return ThumbsUpIcon;
      case "Haha":
        return ThumbsUpIcon;
      case "Like":
        return ThumbsUpIcon;
      case "Love":
        return LoveIcon;
      case "Sad":
        return ThumbsUpIcon;
      case "Wow":
        return ThumbsUpIcon;
    }
  }
}

export default new ServiceHelper();
