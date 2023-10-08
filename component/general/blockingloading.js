import { TailSpin } from "react-loader-spinner";

const BlockingLoadingComponent = ({ visible }) => {
  return (
    <>
      {visible && (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-[1000] flex h-full w-full items-center justify-center bg-secondary/30">
          <div className="flex flex-col items-center justify-center bg-primary px-9 py-6">
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
            <h5 className="mt-4">Please Wait...</h5>
          </div>
        </div>
      )}
    </>
  );
};

export default BlockingLoadingComponent;
