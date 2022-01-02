import { useEffect, useState } from "react";

import AddReactionButton from "../core/AddReactionButton";
import Loader from "../core/Loading";
import ReactionBadge from "../core/Reactions";
import ReactionPostHelpers from "../../helpers/postsHelpers";
import { ServiceTypes } from "../../types";
import { startupDataServices } from "../../services";

export default function ReactionsOnPost({
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
  const [isLoaded, setIsLoaded] = useState(true);
  const [toggleReactionsTab, setReactionTab] = useState(false);
  const [reactionsForPost, setReactionsForPost] = useState<ServiceTypes.ReactionsForPosts>({});
  const [isActivated, setIsActivated] = useState({
    status: false,
    reaction_id: -1,
  });

  useEffect(() => {
    let currentContentReactionMapping = userContentReactionMapping.filter((i) => i.content_id === contentId);
    setReactionsForPost(ReactionPostHelpers.getReactionsCountForPost(currentContentReactionMapping));
  }, [userContentReactionMapping.length]);

  function toggleReactionBadge() {
    setReactionTab(!toggleReactionsTab);
  }

  function generateRandomUserId() {
    return usersList[Math.floor(Math.random() * usersList.length)].id;
  }

  async function deleteUserReaction(reactionId: number) {
    setIsLoaded(false);
    const dataToSend = {
      // generating random user_id between 1 and length of userslist
      id: generateRandomUserId(),
    };
    const deletedReaction = await startupDataServices.deleteReactionForPost(dataToSend);
    if (deletedReaction?.data) {
      reactionsForPost[reactionId] = reactionsForPost[reactionId] - 1;
      setReactionsForPost(reactionsForPost);
      setIsLoaded(true);
    }
  }

  async function addNewReactionToPost(reactionId: number) {
    setIsLoaded(false);
    const dataToSend = {
      // generating random user_id between 0 and length of userslist
      user_id: generateRandomUserId(),
      reaction_id: reactionId,
      content_id: contentId,
    };
    const addedReaction = await startupDataServices.updateReactionsForPost(dataToSend);
    if (addedReaction?.data) {
      // if reaction exists, then update the value
      if (reactionsForPost[reactionId]) {
        reactionsForPost[reactionId] = reactionsForPost[reactionId] + 1;
      }
      // else add the reaction and update the value
      else {
        reactionsForPost[reactionId] = 1;
      }

      setReactionsForPost(reactionsForPost);
      setIsLoaded(true);
      setIsActivated({ status: true, reaction_id: reactionId });
      setTimeout(() => {
        setIsActivated({ status: false, reaction_id: reactionId });
      }, 2000);
    }
  }

  if (!isLoaded) {
    return <Loader message="Updating reaction..." />;
  } else {
    return (
      <div className="mt-3 flex items-center">
        {Object.keys(reactionsForPost).map((i) =>
          reactionsForPost[Number(i)] ? (
            <span
              key={i}
              className={`cursor-pointer inline-flex items-center px-2 py-0.5 rounded-full text-base font-medium text-gray-800 border border-solid m-0.5 ${
                isActivated.status && isActivated.reaction_id === Number(i)
                  ? `bg-coolestBlue-200 border-coolestBlue-300`
                  : `bg-coolestGray-300 border-white`
              }`}
              onClick={() => deleteUserReaction(Number(i))}>
              {`${ReactionPostHelpers.getReactionEmoji(reactionsList, Number(i))} · ${reactionsForPost[Number(i)]}`}
            </span>
          ) : (
            <></>
          ),
        )}
        <div className="relative m-0.5" onClick={toggleReactionBadge}>
          {toggleReactionsTab ? (
            <ReactionBadge reactionsList={reactionsList} tooltipMessage={"Tooltip"} addNewReaction={addNewReactionToPost} />
          ) : (
            <></>
          )}
          <AddReactionButton />
        </div>
      </div>
    );
  }
}
