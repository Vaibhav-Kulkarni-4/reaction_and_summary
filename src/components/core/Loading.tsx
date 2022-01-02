import SpinnerIcon from "../icons/SpinnerIcon";

export default function Loader({ message }: { message: string }) {
  return (
    <div className="font-display fixed top-0 left-0 z-50 block w-full h-full bg-white opacity-90">
      <div className="container absolute inset-0 flex items-center justify-center opacity-90">
        <div>
          <SpinnerIcon />
        </div>
        <div className="absolute flex items-center justify-center mt-36">{message}</div>
      </div>
    </div>
  );
}
