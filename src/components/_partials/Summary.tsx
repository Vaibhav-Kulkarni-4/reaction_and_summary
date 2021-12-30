import { useEffect, useState } from "react";

import type { ServiceTypes } from "../../types";
import Table from "../core/Table";

export default function SummaryTab({
  usersList,
  reactionsList,
  contentId,
}: {
  usersList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  contentId: number;
}) {
  const [filterCommonReactions, setfilterCommonReactions] = useState<
    ServiceTypes.Reaction[]
  >([]);
  const [filteredData, setFilteredData] = useState<ServiceTypes.User[]>([]);
  const [emojiName, setEmojiName] = useState("");

  function getCommonReactions(reactions: ServiceTypes.Reaction[]) {
    const ids = reactionsList.map((i) => i.id);
    return (
      reactions.filter(({ id }, index) => !ids.includes(id, index + 1)) || []
    );
  }

  useEffect(() => {
    let currentContentReactions = getCommonReactions(reactionsList).filter(
      (reaction) => reaction.content_id === contentId
    );
    currentContentReactions = [
      ...currentContentReactions,
      {
        emoji: "",
        name: "All",
        current: false,
      },
    ];
    setfilterCommonReactions(currentContentReactions);
  }, [reactionsList?.length]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  function renderSummary(selectedTab: string) {
    const newFilteredCommonReactions = filterCommonReactions;
    newFilteredCommonReactions.forEach((user) => {
      if (user.name !== selectedTab) {
        user.current = false;
      }
    });
    console.log(
      "newFilteredCommonReactions",
      newFilteredCommonReactions,
      "\n",
      filteredData
    );
    setfilterCommonReactions(newFilteredCommonReactions);
    if (selectedTab !== "All") {
      setFilteredData(usersList.filter((user) => user.name === selectedTab));
      setEmojiName(selectedTab);
    } else {
      let currentPostReactions: string[] = [];
      for (const i of newFilteredCommonReactions) {
        currentPostReactions = [...new Set(currentPostReactions), i.name];
      }
      setFilteredData(
        usersList.filter((user) => currentPostReactions.indexOf(user.name) > -1)
      );
      setEmojiName(selectedTab);
    }
  }

  function getReactionsCount(iconName: string) {
    return usersList.filter((user) => user?.name === iconName).length || 0;
  }

  return (
    <div>
      <div className="px-6 border-b border-gray-200 overflow-y-hidden">
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
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
              )}
              aria-current={tab.current ? "page" : undefined}>
              {tab.name !== "All" ? tab?.emoji : "All"}
              {tab.name !== "All" ? (
                <span>
                  <span className="mx-1">.</span>
                  <span>{getReactionsCount(tab?.name)}</span>
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
