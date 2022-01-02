import { useEffect, useState } from "react";

import AddReactionButton from "../core/AddReactionButton";
import Loader from "../core/Loading";
import ReactionBadge from "../core/Reactions";
import { ReactionPostHelper } from "../../helpers";
import { ServiceTypes } from "../../types";
import { startupDataServices } from "../../services";

export default function ReactionsOnPost({
  userList,
  reactionsList,
  contentId,
  overallReactions,
  getSummaryTabToggleStatus,
}: {
  userList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  contentId: number;
  overallReactions: ServiceTypes.Reaction[];
  // @ts-ignore
  getSummaryTabToggleStatus: (contentId: number) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [toggleReactionsTab, setReactionTab] = useState(false);
  const [isActivated, setIsActivated] = useState({
    status: false,
    emoji: "",
  });
  const [reactionsCountForPost, setReactionsCountForPost] = useState<any>({});

  const usersForCurrentContent = userList.filter((user) => user.content_id === contentId);

  const reactionsForCurrentContent = reactionsList.filter((reaction) => reaction.content_id === contentId);

  useEffect(() => {
    setReactionsCountForPost(ReactionPostHelper.default.getReactionsCountForPost(usersForCurrentContent, reactionsForCurrentContent));
  }, [usersForCurrentContent.length && reactionsForCurrentContent.length]);

  function toggleReactionBadge() {
    setReactionTab(!toggleReactionsTab);
  }

  // @ts-ignore
  async function deleteUserReaction(reaction: string) {
    setIsLoaded(false);
    const dataToSend = {
      // generating random user_id between 1 and length of userslist
      id: usersForCurrentContent[Math.floor(Math.random() * usersForCurrentContent.length)].id,
    };
    const deletedReaction = await startupDataServices.deleteReactionForPost(dataToSend);
    if (deletedReaction?.data) {
      reactionsCountForPost[reaction] = reactionsCountForPost[reaction] - 1;
      setReactionsCountForPost(reactionsCountForPost);
      setIsLoaded(true);
    }
  }

  function getReactionEmoji(reactionId: number) {
    return overallReactions.filter((reaction) => reaction.id === reactionId)[0].emoji;
  }

  async function addNewReactionToPost(reactionId: number) {
    setIsLoaded(false);
    const dataToSend = {
      // generating random user_id between 0 and length of userslist
      user_id: Math.floor(Math.random() * reactionsForCurrentContent.length),
      reaction_id: reactionId,
      content_id: contentId,
    };
    const addedReaction = await startupDataServices.updateReactionsForPost(dataToSend);
    if (addedReaction?.data) {
      // if reaction exists, then update the value
      if (reactionsCountForPost[getReactionEmoji(reactionId)]) {
        reactionsCountForPost[getReactionEmoji(reactionId)] = reactionsCountForPost[getReactionEmoji(reactionId)] + 1;
      }
      // else add the reaction and update the value
      else {
        reactionsCountForPost[getReactionEmoji(reactionId)] = 1;
      }

      setReactionsCountForPost(reactionsCountForPost);
      setIsLoaded(true);
      setIsActivated({ status: true, emoji: getReactionEmoji(reactionId) });
      setTimeout(() => {
        setIsActivated({ status: false, emoji: getReactionEmoji(reactionId) });
      }, 2000);
    }
  }

  if (!isLoaded) {
    return <Loader message="Updating reaction..." />;
  } else {
    return (
      <div className="mt-3 flex items-center">
        {Object.keys(reactionsCountForPost).map((i) =>
          reactionsCountForPost[i] ? (
            <span
              key={i}
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-base font-medium text-gray-800 border border-solid m-0.5 ${
                isActivated.status && isActivated.emoji === i ? `bg-coolestBlue-200 border-coolestBlue-300` : `bg-coolestGray-300 border-white`
              }`}
              // onClick={() => deleteUserReaction(i)}
              onClick={() => getSummaryTabToggleStatus(contentId)}>
              {`${i} · ${reactionsCountForPost[i]}`}
            </span>
          ) : (
            <></>
          ),
        )}
        <div className="relative m-0.5" onClick={toggleReactionBadge}>
          {toggleReactionsTab ? (
            <ReactionBadge overallReactions={overallReactions} tooltipMessage={"Tooltip"} addNewReaction={addNewReactionToPost} />
          ) : (
            <></>
          )}
          <AddReactionButton />
        </div>
      </div>
    );
  }
}
