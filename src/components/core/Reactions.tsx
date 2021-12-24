import React, { useState } from "react";

import ClapsIcon from "../icons/ClapsIcon";
import LoveIcon from "../icons/LoveIcon";
import ThumbsUpIcon from "../icons/ThumbsUpIcon";
import Tooltip from "./Tooltip";

function ReactionBadge() {
  let [tooltip, setTooltip] = useState(false);
  function openToolTip() {
    setTooltip(!tooltip);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <span className="relative z-0 inline-flex shadow-sm rounded-full border border-coolestGray-50">
        <button
          onClick={openToolTip}
          type="button"
          className="relative inline-flex items-center px-4 py-2 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {tooltip ? <Tooltip /> : ""}
          <LoveIcon className="hover:w-auto hover:h-8" />
        </button>
        <button
          onClick={openToolTip}
          type="button"
          className="-ml-px relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {tooltip ? <Tooltip /> : ""}
          <ThumbsUpIcon className="hover:w-auto hover:h-8" />
        </button>
        <button
          onClick={openToolTip}
          type="button"
          className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {tooltip ? <Tooltip /> : ""}
          <ClapsIcon className="hover:w-auto hover:h-8" />
        </button>
      </span>
    </div>
  );
}

export default ReactionBadge;
