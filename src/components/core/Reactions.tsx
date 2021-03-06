import React, { useState } from "react";

import type { ServiceTypes } from "../../types";
import Tooltip from "./Tooltip";

function ReactionBadge({ reactionsList, addNewReaction }: { reactionsList: ServiceTypes.Reaction[]; addNewReaction: (reactionId: number) => {} }) {
  let [tooltip, setTooltip] = useState({
    reactionName: "",
    status: false,
  });

  function handleMouseIn(reaction_name: string) {
    setTooltip({
      reactionName: reaction_name,
      status: !tooltip.status,
    });
  }

  function handleMouseOut(reaction_name: string) {
    setTooltip({ reactionName: reaction_name, status: !tooltip.status });
  }

  return (
    // removing -bottom-16 from below div coz it was overlapping All tab button
    <div className="absolute -top-12 -left-20 max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
      <span
        className="z-10 flex px-1 py-2 justify-center items-center shadow-sm rounded-full border border-coolestGray-50 bg-white mb-3"
        onMouseLeave={() => setTooltip({ reactionName: "", status: false })}>
        {reactionsList.map((reaction) => (
          <button
            key={reaction.id}
            onClick={() => addNewReaction(reaction.id)}
            type="button"
            className="relative flex justify-center items-center w-10 h-4 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:text-2xl"
            onMouseOver={() => handleMouseIn(reaction.name)}
            onMouseOut={() => handleMouseOut(reaction.name)}>
            {reaction.name === tooltip.reactionName ? <Tooltip message={reaction.name} /> : ""}
            {reaction.emoji}
          </button>
        ))}
      </span>
    </div>
  );
}

export default ReactionBadge;
