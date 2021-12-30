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
    // removing -bottom-16 from below div coz it was overlapping All tab button
    <div className="absolute -top-12 -left-20 max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
      <span className="z-10 flex px-1 py-2 justify-center items-center shadow-sm rounded-full border border-coolestGray-50 bg-white mb-3">
        <button
          onClick={openToolTip}
          type="button"
          className="relative flex justify-center items-center w-10 h-4 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {tooltip ? <Tooltip /> : ""}
          <LoveIcon className="z-20 absolute top-0 hover:w-auto hover:h-8 hover:-top-5" />
        </button>
        <button
          onClick={openToolTip}
          type="button"
          className="relative flex justify-center items-center w-10 h-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {tooltip ? <Tooltip /> : ""}
          <ThumbsUpIcon className="z-20 absolute top-0 hover:w-auto hover:h-8 hover:-top-5" />
        </button>
        <button
          onClick={openToolTip}
          type="button"
          className="relative flex justify-center items-center w-10 h-4 rounded-r-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
          {tooltip ? <Tooltip /> : ""}
          <ClapsIcon className="z-20 absolute top-0 hover:w-auto hover:h-8 hover:-top-5" />
        </button>
      </span>
    </div>
  );
}

export default ReactionBadge;
