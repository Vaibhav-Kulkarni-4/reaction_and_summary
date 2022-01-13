import { useEffect, useState } from "react";

import AddReactionButton from "../core/AddReactionButton";
import ReactionBadge from "../core/Reactions";
import ReactionPostHelpers from "../../helpers/postsHelpers";
import { ServiceTypes } from "../../types";
import Summary from "../_partials/SummaryOnPost";
import { generalUtils } from "../../utilities";
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
  const [toast, setToastMessage] = useState<Partial<{ isActive: boolean; type: string; title: string; message: string }>>({
    isActive: false,
    type: "",
    title: "",
    message: "",
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
  const [toggleSummaryTab, setToggleSummaryTab] = useState({
    status: false,
    contentId: 0,
    reactionId: 0,
  });
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

  function getSummaryTabToggleStatus(reaction_id: number) {
    setToggleSummaryTab({
      status: !toggleSummaryTab.status,
      contentId,
      reactionId: reaction_id,
    });
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
      setToastMessage({ isActive: true, type: "error", title: "Remove reaction", message: deleteReactionResponse.data });
      setTimeout(() => {
        setToastMessage({ isActive: false });
      }, 1500);
    }
  }

  async function addNewReactionToPost(reactionId: number) {
    const dataToSend = {
      user_id: 4,
      reaction_id: reactionId,
      content_id: contentId,
    };
    if (isReactionAlreadyActivated(reactionId)) {
      deleteUserReaction(reactionId);
      return;
    }
    setIsActivated({ status: true, reaction_id: reactionId });
    updateExistingReactions(ADD_EVENT, reactionId, true);
    const addedReactionResponse = await startupDataServices.updateReactionsForPost(dataToSend);
    if (!addedReactionResponse.ok) {
      setIsActivated({ status: false, reaction_id: reactionId });
      updateExistingReactions(ADD_EVENT, reactionId, false);
      setToastMessage({ isActive: true, type: "error", title: "Add reaction", message: addedReactionResponse.data });
      setTimeout(() => {
        setToastMessage({ isActive: false });
      }, 1500);
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
        reactionsForPost[reactionId] = reactionsForPost[reactionId] - 1;
        setReactionsForPost(reactionsForPost);
        break;
      }
    }
  }

  console.log("OUTSIDE reactionsForPost", reactionsForPost, addNewReactionResponse);

  if (toast.isActive) {
    return generalUtils.displayToastMessage(toast.type, toast.title, toast.message);
  } else if (!toast.isActive) {
    return (
      <>
        <div className="mt-3 flex items-center">
          {Object.keys(reactionsForPost).map((reaction_id) => (
            <span
              key={reaction_id}
              className={`cursor-pointer inline-flex items-center px-2 py-0.5 rounded-full text-base font-medium text-gray-800 border border-solid m-0.5 ${
                isActivated.status && isActivated.reaction_id === Number(reaction_id)
                  ? `bg-coolestBlue-200 border-coolestBlue-300`
                  : `bg-coolestGray-300 border-white`
              }`}
              // onClick={() => deleteUserReaction(Number(reaction_id))}
              onClick={() => getSummaryTabToggleStatus(Number(reaction_id))}>
              {`${ReactionPostHelpers.getReactionEmoji(reactionsList, Number(reaction_id))} · ${reactionsForPost[Number(reaction_id)]}`}
            </span>
          ))}
          <div className="relative m-0.5" onClick={toggleReactionBadge}>
            {toggleReactionsTab ? <ReactionBadge reactionsList={reactionsList} addNewReaction={addNewReactionToPost} /> : <></>}
            <AddReactionButton />
          </div>
        </div>
        <div>
          {toggleSummaryTab.status && toggleSummaryTab.contentId === contentId ? (
            <Summary
              usersList={usersList}
              reactionsList={reactionsList}
              userContentReactionMapping={userContentReactionMapping}
              contentId={contentId}
              selectedReactionId={toggleSummaryTab.reactionId}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
