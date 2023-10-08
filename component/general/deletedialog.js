const DeleteDialog = ({
  title,
  message,
  type,
  onPerformDeleteClicked,
  onCancelDeleteClicked,
}) => {
  return (
    <div className=" fixed top-0 left-0 right-0 z-50 flex h-full w-full items-center justify-center overflow-y-scroll bg-secondary/50 px-8 ">
      <div className=" m-auto max-w-250 rounded-lg bg-primary px-10 py-7 shadow-lg">
        <h4 className="text-base font-bold">
          {title ? title : "Are You Sure?"}
        </h4>

        <h4 className="my-6 text-sm text-dogwoodRose">
          {message ? message : `Confirm that you want to delete this ${type}`}
        </h4>

        <div className=" flex justify-center">
          <button
            className=" mx-4 flex max-h-11 items-center justify-center bg-dogwoodRose/70 text-primary transition-colors ease-in-out hover:bg-dogwoodRose"
            onClick={onPerformDeleteClicked}
          >
            Delete
          </button>
          <button
            className=" mx-4 flex max-h-11 items-center justify-center border-2 border-bgPurple bg-[transparent] text-secondary shadow-lg hover:bg-bgPurple hover:text-primary"
            onClick={onCancelDeleteClicked}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
