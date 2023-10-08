import { AppContext } from "../../pages/AppContext";
import LoadingComponent from "./loading";
import BlockingLoadingComponent from "./blockingloading";
import Message from "./message";

const GeneralUI = () => {
  const value = AppContext();

  return (
    <>
      {value.state.isBlockingLoading && (
        <BlockingLoadingComponent visible={value.state.isBlockingLoading} />
      )}

      {value.state.isLoading && (
        <LoadingComponent visible={value.state.isLoading} />
      )}

      {value.state.message.visible && (
        <Message setMessage={value.setMessage} message={value.state.message} />
      )}
    </>
  );
};

export default GeneralUI;
