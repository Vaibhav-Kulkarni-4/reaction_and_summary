import { useEffect, useState } from "react";

import AddReactionButton from "../core/AddReactionButton";
import ReactionBadge from "../core/Reactions";
import ReactionPostHelpers from "../../helpers/postsHelpers";
import { ServiceTypes } from "../../types";
import { generalUtils } from "../../utilities";
import { startupDataServices } from "../../services";
import { toastConfigConstants } from "../../constants";

export default function ReactionsOnPost({
  usersList,
  reactionsList,
  userContentReactionMapping,
  contentId,
  getSummaryTabToggleStatus,
  triggerCall,
}: {
  usersList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  userContentReactionMapping: ServiceTypes.UserContentReaction[];
  contentId: number;
  getSummaryTabToggleStatus: () => void;
  triggerCall: () => void;
}) {
  const [count, setCount] = useState({
    react_count: 0,
    reaction_id: -1,
  });
  const [toggleReactionsTab, setReactionTab] = useState(false);
  const [reactionsForPost, setReactionsForPost] = useState<ServiceTypes.ReactionsForPosts>({});
  const [isActivated, setIsActivated] = useState({
    status: false,
    reaction_id: -1,
  });
  const [addNewReactionResponse, setAddNewReactionResponse] = useState<ServiceTypes.AddReactionOnPostResponse>(
    {} as ServiceTypes.AddReactionOnPostResponse,
  );

  const ADD_EVENT = "add";
  const DELETE_EVENT = "delete";

  useEffect(() => {
    let currentContentReactionMapping = userContentReactionMapping.filter((i) => i.content_id === contentId);
    setReactionsForPost(ReactionPostHelpers.getReactionsCountForPost(currentContentReactionMapping));
  }, [userContentReactionMapping.length]);

  useEffect(() => {}, [reactionsForPost]);

  function toggleReactionBadge() {
    setReactionTab(!toggleReactionsTab);
  }

  function generateRandomUserId() {
    return usersList[Math.floor(Math.random() * usersList.length)].id;
  }

  function isReactionAlreadyActivated(reaction_id: number) {
    if (isActivated.status && isActivated.reaction_id === reaction_id) {
      return true;
    }
    return false;
  }

  async function deleteUserReaction(reactionId: number) {
    const dataToSend = {
      id: addNewReactionResponse.id,
    };
    updateExistingReactions(DELETE_EVENT, reactionId, true);
    const deleteReactionResponse = await startupDataServices.deleteReactionForPost(dataToSend);
    if (!deleteReactionResponse.ok) {
      updateExistingReactions(DELETE_EVENT, reactionId, false);
      generalUtils.displayToastMessage({ type: toastConfigConstants.errorToastType, title: "Remove reaction", message: deleteReactionResponse.data });
    }
  }

  async function addNewReactionToPost(reactionId: number) {
    if (isReactionAlreadyActivated(reactionId)) {
      deleteUserReaction(reactionId);
      return;
    }
    const dataToSend = {
      user_id: 4,
      reaction_id: reactionId,
      content_id: contentId,
    };
    setIsActivated({ status: true, reaction_id: reactionId });
    updateExistingReactions(ADD_EVENT, reactionId, true);
    triggerCall();
    const addedReactionResponse = await startupDataServices.updateReactionsForPost(dataToSend);
    if (!addedReactionResponse.ok) {
      setIsActivated({ status: false, reaction_id: reactionId });
      updateExistingReactions(ADD_EVENT, reactionId, false);
      generalUtils.displayToastMessage({ type: toastConfigConstants.errorToastType, title: "Add reaction", message: addedReactionResponse.data });
      return;
    }
    setAddNewReactionResponse(addedReactionResponse.data);
  }

  function updateExistingReactions(event: string, reactionId: number, isStatusSuccess: boolean) {
    switch (event) {
      case ADD_EVENT: {
        // if reaction exists, then update the value
        if (reactionsForPost[reactionId] && isStatusSuccess) {
          reactionsForPost[reactionId] = reactionsForPost[reactionId] + 1;
          setReactionsForPost(reactionsForPost);
        }
        // else add the reaction to the list and update the value
        else if (isStatusSuccess) {
          reactionsForPost[reactionId] = 1;
          setReactionsForPost(reactionsForPost);
        }
        // fallback to previous state if service fails
        else {
          reactionsForPost[reactionId] = reactionsForPost[reactionId] - 1;
          setReactionsForPost(reactionsForPost);
        }
        break;
      }
      case DELETE_EVENT: {
        // actual condition i.e. deleting the just added reaction
        if (reactionsForPost[reactionId] && isStatusSuccess) {
          reactionsForPost[reactionId] = reactionsForPost[reactionId] - 1;
          setCount({ react_count: reactionsForPost[reactionId], reaction_id: reactionId });
          setReactionsForPost(reactionsForPost);
        }
        // fallback to previous state if service fails
        else {
          reactionsForPost[reactionId] = reactionsForPost[reactionId] + 1;
          setCount({ react_count: reactionsForPost[reactionId], reaction_id: reactionId });
          setReactionsForPost(reactionsForPost);
        }
        break;
      }
    }
  }

  return (
    <>
      <div className="mt-3 flex items-center">
        {Object.keys(reactionsForPost).map((reaction_id) => (
          <span
            key={reaction_id}
            id="reactions_on_posts"
            className={`cursor-pointer inline-flex items-center px-2 py-0.5 rounded-full text-base font-medium text-gray-800 border border-solid m-0.5 ${
              isActivated.status && isActivated.reaction_id === Number(reaction_id)
                ? `bg-coolestBlue-200 border-coolestBlue-300`
                : `bg-coolestGray-300 border-white`
            }`}
            // onClick={() => deleteUserReaction(Number(reaction_id))}
            onClick={() => {
              if (isReactionAlreadyActivated(Number(reaction_id))) addNewReactionToPost(Number(reaction_id));
            }}>
            {`${ReactionPostHelpers.getReactionEmoji(reactionsList, Number(reaction_id))} · ${
              count.reaction_id === Number(reaction_id) ? count.react_count : reactionsForPost[Number(reaction_id)]
            }`}
          </span>
        ))}
        <div className="cursor-pointer relative m-0.5" onClick={toggleReactionBadge}>
          {toggleReactionsTab ? <ReactionBadge reactionsList={reactionsList} addNewReaction={addNewReactionToPost} /> : <></>}
          <AddReactionButton />
        </div>
        <div className="cursor-pointer p-2" onClick={getSummaryTabToggleStatus}>
          <u>Summary</u>
        </div>
      </div>
    </>
  );
}
