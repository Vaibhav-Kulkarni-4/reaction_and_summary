function Tooltip() {
  return (
    <div className="relative mx-2">
      <div className="bg-coolestGray-900 flex items-center text-white rounded-full py-0.5 px-2 right-0 bottom-full font-normal not-italic text-xs">
        Tooltip center
        <svg
          className="absolute text-black h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve">
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
}
export default Tooltip;
