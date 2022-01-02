import { useEffect, useState } from "react";

import Loader from "../core/Loading";
import Posts from "./Posts";
import { ServiceHelper } from "../../helpers";
import type { ServiceTypes } from "../../types";
import { startupDataServices } from "../../services";

function Home() {
  let [isLoaded, setIsLoaded] = useState(false);
  let [users, setUsers] = useState<ServiceTypes.User[]>([]);
  let [reactions, setReactions] = useState<ServiceTypes.Reaction[]>([]);
  let [overallReactions, setOverallReactions] = useState<ServiceTypes.Reaction[]>([]);
  // let [userContentReactionMapping, setUserContentReactionMapping] = useState<ServiceTypes.UserContentReaction[]>([])

  useEffect(() => {
    (async () => {
      const usersData = await startupDataServices.getUsers();
      const reactionsData = await startupDataServices.getReactions();
      const userReactionMapping = await startupDataServices.getUserReactionsMapping();

      if (usersData?.data || reactionsData?.data || userReactionMapping?.data) {
        setIsLoaded(true);
      }

      if (usersData?.data && reactionsData?.data && userReactionMapping?.data) {
        const usersContentReaction = ServiceHelper.default.curateUsersReactionList(usersData?.data, reactionsData?.data, userReactionMapping?.data);
        const summaryTabsReactions = ServiceHelper.default.createSummaryTabs(usersContentReaction);
        setUsers(usersContentReaction);
        setReactions(summaryTabsReactions);
        setOverallReactions(reactionsData?.data);
        // setUserContentReactionMapping(userReactionMapping?.data)
        console.log("DATA", usersContentReaction, summaryTabsReactions, userReactionMapping?.data);
      }
    })();
  }, []);

  if (!isLoaded) {
    return <Loader message="Loading users..." />;
  } else {
    return <Posts usersList={users} reactionsList={reactions} overallReactions={overallReactions} />;
  }
}
export default Home;
