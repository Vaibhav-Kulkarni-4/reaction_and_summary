import { useEffect, useState } from "react";

import Loader from "../core/Loading";
import Posts from "../core/Posts";
import type { ServiceTypes } from "../../types";
import { startupDataServices } from "../../services";

function Home() {
  let [isLoaded, setIsLoaded] = useState(false);
  let [users, setUsers] = useState<ServiceTypes.User[]>([]);
  let [reactions, setReactions] = useState<ServiceTypes.Reaction[]>([]);
  let [userContentReactionMapping, setUserContentReactionMapping] = useState<ServiceTypes.UserContentReaction[]>([]);

  useEffect(() => {
    (async () => {
      const usersData = await startupDataServices.getUsers();
      const reactionsData = await startupDataServices.getReactions();
      const userReactionMapping = await startupDataServices.getUserReactionsMapping();

      if (usersData?.data || reactionsData?.data || userReactionMapping?.data) {
        setIsLoaded(true);
        setUsers(usersData?.data);
        setReactions(reactionsData?.data);
        setUserContentReactionMapping(userReactionMapping?.data);
      }
    })();
  }, []);

  if (!isLoaded) {
    return <Loader message="Loading users, reactions..." />;
  } else {
    return <Posts usersList={users} reactionsList={reactions} userContentReactionMapping={userContentReactionMapping} />;
  }
}
export default Home;
