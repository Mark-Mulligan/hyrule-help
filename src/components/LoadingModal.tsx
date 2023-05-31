// react
import type { FC } from "react";

interface IProps {
  loadingText: string;
}

const LoadingModal: FC<IProps> = ({ loadingText }) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black opacity-50">
      <div className="text-center text-white">
        <h4>{loadingText}</h4>
        <progress className="progress progress-accent w-56" />
      </div>
    </div>
  );
};

export default LoadingModal;
