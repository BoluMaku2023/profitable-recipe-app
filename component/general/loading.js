import { TailSpin } from "react-loader-spinner";

const LoadingComponent = ({ visible }) => {
  return (
    <>
      {visible && (
        <div className="fixed top-0 right-0 left-0 bottom-0 z-50 mr-6 flex h-24 max-h-24 w-24 max-w-24 items-center justify-center">
          <TailSpin
            height="50"
            width="50"
            color="#BD5BFC"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={visible}
          />
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
