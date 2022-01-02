import React, { useState } from "react";

import type { ServiceTypes } from "../../types";
import Tooltip from "./Tooltip";

function ReactionBadge({
  overallReactions,
  tooltipMessage,
  addNewReaction,
}: {
  overallReactions: ServiceTypes.Reaction[];
  tooltipMessage: string;
  addNewReaction: (reactionId: number) => {};
}) {
  let [tooltip, setTooltip] = useState(false);

  return (
    // removing -bottom-16 from below div coz it was overlapping All tab button
    <div className="absolute -top-12 -left-20 max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
      <span className="z-10 flex px-1 py-2 justify-center items-center shadow-sm rounded-full border border-coolestGray-50 bg-white mb-3">
        {overallReactions.map((reaction) => (
          <button
            key={reaction.id}
            onClick={() => addNewReaction(reaction.id)}
            type="button"
            className="relative flex justify-center items-center w-10 h-4 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            {tooltip ? <Tooltip message={tooltipMessage} /> : ""}
            {reaction.emoji}
          </button>
        ))}
      </span>
    </div>
  );
}

export default ReactionBadge;
