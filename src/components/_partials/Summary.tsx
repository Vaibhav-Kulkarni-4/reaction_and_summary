import ClapsIcon from "../icons/ClapsIcon";
import LoveIcon from "../icons/LoveIcon";
import { ServiceHelper } from "../../helpers";
import type { ServiceTypes } from "../../types";
import Table from "../core/Table";
import ThumbsUpIcon from "../icons/ThumbsUpIcon";
import { useState } from "react";

export default function SummaryTab({
  usersList,
  reactionsList,
}: {
  usersList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
}) {
  // const [filteredUsersList, setFilteredUsersList] = useState<
  //   ServiceTypes.User[]
  // >([]);
  const reactionTabs = ServiceHelper.default.createSummaryTabs(
    reactionsList
  ) as {
    [key: string]: {
      name?: string;
      current?: boolean;
      emoji?: any;
      id?: number;
    };
  };
  console.log(
    "SUMMARY Comp\n",
    usersList,
    "\n",
    reactionsList,
    "\n",
    reactionTabs
  );

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  function renderSummary(selectedTab: string) {
    const filteredData = usersList.filter((user) => user.name === selectedTab);
    // setFilteredUsersList(filteredData);
    console.log("clicked", selectedTab, filteredData);
    return <Table list={filteredData} />;
  }

  function getIconMapping(iconName: string) {
    switch (iconName) {
      case "ThumbsUpIcon":
        return <ThumbsUpIcon className="-ml-0.5 mr-2 h-5 w-5" />;
      case "LoveIcon":
        return <LoveIcon className="-ml-0.5 mr-2 h-5 w-5" />;
      case "ClapsIcon":
        return <ClapsIcon className="-ml-0.5 mr-2 h-5 w-5" />;
    }
  }

  function getReactionsCount(iconName: string) {
    return (
      // @ts-ignore
      usersList.filter((user) => user?.emoji?.name === iconName).length || 0
    );
  }

  return (
    <div>
      <div className="border-b border-gray-200 overflow-y-hidden overflow-x-scroll">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {Object.values(reactionTabs).map((tab: any) => (
            <p
              onClick={() => {
                tab.current = true;
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
              {tab.name !== "All" ? getIconMapping(tab?.emoji?.name) : "All"}
              {tab.name !== "All" ? (
                <span>
                  <span className="-ml-1 mr-1">.</span>
                  <span>{getReactionsCount(tab?.emoji?.name)}</span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
        </nav>
      </div>
      <Table list={usersList} />
    </div>
  );
}
