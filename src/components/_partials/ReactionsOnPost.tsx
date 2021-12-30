import AddReactionButton from "../core/AddReactionButton";
import Loader from "../core/Loading";
import ReactionBadge from "../core/Reactions";
import { ReactionPostHelper } from "../../helpers";
import { ServiceTypes } from "../../types";
import { startupDataServices } from "../../services";
import { useState } from "react";

export default function ReactionsOnPost({
  userList,
  reactionsList,
  contentId,
  overallReactions,
}: {
  userList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  contentId: number;
  overallReactions: ServiceTypes.Reaction[];
}) {
  let [isLoaded, setIsLoaded] = useState(true);
  const [toggleReactionsTab, setReactionTab] = useState(false);

  const usersForCurrentContent = userList.filter(
    (user) => user.content_id === contentId
  );

  const reactionsForCurrentContent = reactionsList.filter(
    (reaction) => reaction.content_id === contentId
  );

  const reactionsCountForPost =
    ReactionPostHelper.default.getReactionsCountForPost(
      usersForCurrentContent,
      reactionsForCurrentContent
    );

  function toggleReactionBadge() {
    setReactionTab(!toggleReactionsTab);
  }

  async function updateUserReactionStatus() {
    setIsLoaded(false);
    const dataToSend = {
      id: Math.floor(Math.random() * reactionsForCurrentContent.length),
      // generating random user_id between 0 and length of userslist
    };
    const deletedReaction = await startupDataServices.deleteReactionForPost(
      dataToSend
    );
    if (deletedReaction?.data) {
      setIsLoaded(true);
    }
    console.log("deletedReaction", deletedReaction?.data);
  }

  async function addNewReactionToPost(reactionId: number) {
    setIsLoaded(false);
    console.log("reactionName", reactionId);
    const dataToSend = {
      user_id: Math.floor(Math.random() * reactionsForCurrentContent.length),
      // generating random user_id between 0 and length of userslist
      reaction_id: reactionId,
      content_id: contentId,
    };
    const addedReaction = await startupDataServices.updateReactionsForPost(
      dataToSend
    );
    if (addedReaction?.data) {
      setIsLoaded(true);
    }
    console.log("addedReaction", addedReaction?.data);
  }

  if (!isLoaded) {
    return <Loader message="Updating reaction..." />;
  } else {
    return (
      <div className="mt-3 flex items-center">
        {Object.keys(reactionsCountForPost).map((i) => (
          <span
            key={i}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-base font-medium bg-coolestGray-300 text-gray-800 border border-solid border-white"
            onClick={updateUserReactionStatus}>
            {`${i} · ${reactionsCountForPost[i]}`}
          </span>
        ))}
        <div className="relative" onClick={toggleReactionBadge}>
          {toggleReactionsTab ? (
            <ReactionBadge
              overallReactions={overallReactions}
              tooltipMessage={"Tooltip"}
              addNewReaction={addNewReactionToPost}
            />
          ) : (
            <></>
          )}
          <AddReactionButton />
        </div>
        {/* <span
      className="mt-3 inline-flex items-center px-2 py-0.5 rounded-full text-base font-medium bg-coolestGray-300 text-gray-800 border border-solid border-white"
      onClick={addNewReactionToPost}>
      {`Add Reaction`}
    </span> */}
      </div>
    );
  }
}
