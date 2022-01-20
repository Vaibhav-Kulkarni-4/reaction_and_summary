import { useEffect, useState } from "react";

import ReactionPostHelpers from "../../helpers/postsHelpers";
import type { ServiceTypes } from "../../types";
import Table from "./UsersSummary";

export default function SummaryTab({
  usersList,
  reactionsList,
  userContentReactionMapping,
  contentId,
}: {
  usersList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  userContentReactionMapping: ServiceTypes.UserContentReaction[];
  contentId: number;
}) {
  const [reactionsForPost, setReactionsForPost] = useState<any>({});
  const [reactionId, setReactionId] = useState<string | number>();
  const [filteredUsersForReaction, setFilteredUsersForReaction] = useState<any>();
  let [current, setCurrent] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setReactionsForPost(ReactionPostHelpers.getUsersCountForReaction(userContentReactionMapping, contentId));
  }, [userContentReactionMapping.length]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  function renderSummary(selectedTab: string | number) {
    if (selectedTab === reactionId) {
      setReactionId("");
    } else {
      const usersMappingForTab = reactionsForPost[selectedTab];
      // Setting all other unactive tabs to false. Only highlight current selected tab
      for (const i in reactionsForPost) {
        if (selectedTab !== i) {
          reactionsForPost[i]["current"] = false;
        }
      }
      let users: ServiceTypes.User[] = ReactionPostHelpers.getUsersForReactionTab(usersList, reactionsList, usersMappingForTab);
      setFilteredUsersForReaction(users);
      setReactionId(selectedTab);
    }
  }

  function prepareDataForRendering(reaction_id: string) {
    current = {};
    current[reaction_id] = true;
    setCurrent(current);
    renderSummary(reaction_id === "All" ? reaction_id : Number(reaction_id));
  }

  return (
    <div className="px-6 whitespace-nowrap">
      <div className="px-1 overflow-y-hidden">
        <p className="font-display font-semibold text-base not-italic leading-4 tracking-wide text-coolestGray-900">Reactions</p>
        <nav className="-mb-px z-10 flex space-x-8" aria-label="Tabs">
          {Object.keys(reactionsForPost).map((reaction_id) => (
            <p
              onClick={() => prepareDataForRendering(reaction_id)}
              key={Math.random()}
              className={classNames(
                current[reaction_id]
                  ? "border-coolestBlue-100 text-coolestBlue-100"
                  : "border-transparent font-normal text-gray-800 hover:font-semibold hover:border-coolestBlue-100",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer",
              )}>
              {/* Get reaction emoji to display in summary tab. */}
              {reaction_id !== "All" ? ReactionPostHelpers.getReactionEmoji(reactionsList, Number(reaction_id)) : "All"}
              {reaction_id !== "All" ? (
                <span>
                  <span className="mx-1">·</span>
                  {/* Display the count pf reaction emoji in summary tab. */}
                  <span>{reactionsForPost[reaction_id].length}</span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
        </nav>
        {reactionId ? <Table list={filteredUsersForReaction} /> : <></>}
      </div>
    </div>
  );
}
