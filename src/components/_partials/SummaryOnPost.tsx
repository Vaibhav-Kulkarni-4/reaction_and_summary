import { useEffect, useState } from "react";

import { ReactionPostHelper } from "../../helpers";
import type { ServiceTypes } from "../../types";
import Table from "./UsersSummary";

export default function SummaryTab({
  usersList,
  reactionsList,
  contentId,
}: {
  usersList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  contentId: number;
}) {
  const [filterCommonReactions, setfilterCommonReactions] = useState<ServiceTypes.Reaction[]>([]);
  const [filteredData, setFilteredData] = useState<ServiceTypes.User[]>([]);
  const [emojiName, setEmojiName] = useState("");
  let finalData: ServiceTypes.Reaction[] = [];
  let countOfReactions: any = {};

  function getCommonReactions() {
    const usersForCurrentContent = usersList.filter((user) => user.content_id === contentId);

    const reactionsForCurrentContent = reactionsList.filter((reaction) => reaction.content_id === contentId);

    const reactionsCountForCurrentPost: any = ReactionPostHelper.default.getReactionsCountForPost(usersForCurrentContent, reactionsForCurrentContent);

    for (const i in reactionsCountForCurrentPost) {
      for (const reaction of reactionsForCurrentContent) {
        if (i === reaction.emoji) {
          finalData = [];
          const count = reactionsCountForCurrentPost[i];
          countOfReactions[i] = {
            content_id: reaction.content_id,
            current: false,
            id: reaction.id,
            emoji: reaction.emoji,
            name: reaction.name,
            count,
          };
          finalData.push(countOfReactions[i]);
        }
      }
    }
    // Add "All" section to the reaction tab list
    countOfReactions = {
      ...countOfReactions,
      ...{ All: { emoji: "", name: "All", current: false } },
    };
    return countOfReactions;
  }

  useEffect(() => {
    setfilterCommonReactions(getCommonReactions());
  }, [reactionsList?.length]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  function renderSummary(selectedTab: string) {
    const newFilteredCommonReactions = filterCommonReactions;
    // Set all other unactive tabs to false. Only highlight current selected tab
    for (const i in newFilteredCommonReactions) {
      if (newFilteredCommonReactions[i].name !== selectedTab) {
        newFilteredCommonReactions[i].current = false;
      }
    }

    setfilterCommonReactions(newFilteredCommonReactions);

    if (selectedTab === emojiName) {
      setEmojiName("");
    } else if (selectedTab !== "All") {
      setFilteredData(usersList.filter((user) => user.name === selectedTab));
      setEmojiName(selectedTab);
    } else {
      let currentPostReactions: string[] = []; // ["Sad", "Happy", ...]
      for (const i in newFilteredCommonReactions) {
        currentPostReactions = [...new Set(currentPostReactions), newFilteredCommonReactions[i].name];
      }
      setFilteredData(usersList.filter((user) => currentPostReactions.indexOf(user.name) > -1));
      setEmojiName(selectedTab);
    }
  }

  return (
    <div>
      <div className="px-6 border-b border-gray-200 overflow-y-hidden">
        <p className="font-display font-semibold text-base not-italic leading-4 tracking-wide text-coolestGray-900">Reactions</p>
        <nav className="-mb-px z-10 flex space-x-8" aria-label="Tabs">
          {Object.values(filterCommonReactions).map((tab) => (
            <p
              onClick={() => {
                tab.current = !tab.current;
                renderSummary(tab.name);
              }}
              key={tab.name}
              className={classNames(
                tab.current
                  ? "border-coolestBlue-100 text-coolestBlue-100"
                  : "border-transparent font-normal text-gray-800 hover:font-semibold hover:border-coolestBlue-100",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm",
              )}
              aria-current={tab.current ? "page" : undefined}>
              {tab.name !== "All" ? tab?.emoji : "All"}
              {tab.name !== "All" ? (
                <span>
                  <span className="mx-1">·</span>
                  <span>{tab.count}</span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
        </nav>
        {emojiName ? <Table list={filteredData} /> : <></>}
      </div>
    </div>
  );
}
