import AddReactionButton from "./AddReactionButton";
import ReactionBadge from "./Reactions";
import { ReactionPostHelper } from "../../helpers";
import { ServiceTypes } from "../../types";
import { startupDataServices } from "../../services";

export default function ReactionsOnPost({
  userList,
  reactionsList,
  contentId,
}: {
  userList: ServiceTypes.User[];
  reactionsList: ServiceTypes.Reaction[];
  contentId: number;
}) {
  const usersForCurrentContent = userList.filter(
    (user) => user.content_id === contentId
  );
  const reactionsForCurrentContent = reactionsList.filter(
    (reaction) => reaction.content_id === contentId
  );
  const data = ReactionPostHelper.default.getReactionsCountForPost(
    usersForCurrentContent,
    reactionsForCurrentContent
  );
  async function updateUserReactionStatus() {
    const dataToSend = {
      id: 4,
    };
    const deletedReaction = await startupDataServices.deleteReactionForPost(
      dataToSend
    );
    console.log("deletedReaction", deletedReaction);
  }

  async function addNewReactionToPost() {
    const dataToSend = {
      user_id: 4,
      reaction_id: 3,
      content_id: 2,
    };
    const addedReaction = await startupDataServices.updateReactionsForPost(
      dataToSend
    );
    console.log("addedReaction", addedReaction);
  }

  return (
    <div className="mt-3 flex items-center">
      {Object.keys(data).map((i) => (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-base font-medium bg-coolestGray-300 text-gray-800 border border-solid border-white"
          onClick={updateUserReactionStatus}>
          {`${i} . ${data[i]}`}
        </span>
      ))}
      <div className="relative">
        <ReactionBadge />
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
