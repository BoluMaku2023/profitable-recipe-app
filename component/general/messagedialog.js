const MessageDialog = ({
  title,
  message,
  onPerformClicked,
  onCancelClicked,
}) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-40 flex w-full items-center justify-center bg-secondary/50">
      <div className=" flex max-w-700 flex-col items-center rounded-lg bg-primary px-8 py-4 shadow-lg">
        <h4 className="text-xl font-bold text-bgPurple">
          {title ? title : "Confirmation"}
        </h4>
        <h4 className="my-6 text-center text-dogwoodRose"> {message}</h4>
        <div className="mx-auto flex w-full items-center justify-center">
          <button
            className=" flex max-h-24 w-28 items-center justify-center bg-bgPurple text-primary transition-colors hover:bg-darkPurple"
            onClick={onPerformClicked}
          >
            Ok
          </button>
          <button
            className=" ml-6 flex max-h-24 w-28 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors hover:bg-dogwoodRose"
            onClick={onCancelClicked}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDialog;
