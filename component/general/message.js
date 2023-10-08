const Message = ({ message, setMessage }) => {
  const getBackgroundColor = () => {
    switch (message.type) {
      case "ERROR":
        return "#E41F26";
        break;
      case "INFO":
        return "#FFFFFF";
        break;
      case "SUCCESS":
        return "#33A454";
        break;
    }
  };

  const getTextColor = () => {
    switch (message.type) {
      case "ERROR":
        return "#FFFFFF";
        break;
      case "INFO":
        return "#111111";
        break;
      case "SUCCESS":
        return "#FFFFFF";
        break;
    }
  };

  const hideMessage = () => {
    setMessage({ message: "", title: "", type: "", visible: false });
  };

  return (
    <div className=" fixed top-0 left-0 z-30 flex h-screen w-full items-center justify-center bg-secondary/50">
      <div
        className=" w- flex w-500 min-w-250 flex-col items-center justify-center rounded-lg bg-primary p-6"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <h3 style={{ color: getTextColor() }} className="my-3 font-semibold">
          {(message.title && message.title.length) > 0
            ? message.title
            : "Message"}
        </h3>

        <h5
          style={{ color: getTextColor() }}
          className="mt-2 px-12 text-center"
        >
          {message.message}
        </h5>

        <button
          onClick={hideMessage}
          className=" mt-2 flex max-h-11 items-center justify-center bg-dogwoodRose/70 font-semibold text-primary transition-colors ease-in-out hover:bg-dogwoodRose"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Message;
