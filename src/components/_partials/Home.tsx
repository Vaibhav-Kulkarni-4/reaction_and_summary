import { useEffect, useState } from "react";

import Loader from "../core/Loading";
import Posts from "../core/Posts";
import { ServiceHelper } from "../../helpers";
import type { ServiceTypes } from "../../types";
import Summary from "./Summary";
import { startupDataServices } from "../../services";

function Home() {
  let [isLoaded, setIsLoaded] = useState(false);
  let [users, setUsers] = useState<ServiceTypes.User[]>([]);
  let [reactions, setReactions] = useState<ServiceTypes.Reaction[]>([]);
  let [summaryTabs, setSummaryTabs] = useState<ServiceTypes.SummaryTabs[]>([]);

  useEffect(() => {
    (async () => {
      const usersData = await startupDataServices.getUsers();
      const reactionsData = await startupDataServices.getReactions();
      if (usersData?.data || reactionsData?.data) {
        setIsLoaded(true);
        setReactions(reactionsData?.data);
      }
      if (usersData?.data && reactionsData?.data) {
        const usersDataWithReactions = ServiceHelper.default.addReactions(
          usersData?.data,
          reactionsData?.data
        );
        const reactionTabs = ServiceHelper.default.createSummaryTabs(
          reactionsData?.data
        );
        setUsers(usersDataWithReactions);
        setSummaryTabs(reactionTabs);
      }
    })();
  }, []);

  if (!isLoaded) {
    return <Loader message="Loading users..." />;
  } else {
    return (
      <div>
        <Posts />
        <Summary
          usersList={users}
          reactionsList={reactions}
          // tabsList={summaryTabs}
        />
      </div>
    );
  }
}
export default Home;
