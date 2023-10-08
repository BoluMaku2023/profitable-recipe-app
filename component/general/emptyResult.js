const EmptyResult = ({ message, onEmptyButtonClicked, emptyButtonText }) => {
  return (
    <div className=" flex w-full flex-col items-center justify-between px-4">
      <h5 className="text-dogwoodRose">
        {message ? message : "No content was found"}
      </h5>
      <button
        className="mt-6 flex items-center justify-center bg-dogwoodRose/70 font-semibold text-primary transition-colors hover:bg-dogwoodRose"
        onClick={(e) => onEmptyButtonClicked(e)}
      >
        {emptyButtonText ? emptyButtonText : "Try again"}
      </button>
    </div>
  );
};

export default EmptyResult;
