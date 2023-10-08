import { createContext, useState, useContext } from "react";

const Context = createContext({});

const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBlockingLoading, setBlockingLoading] = useState(false);
  const [message, setMessage] = useState({
    visible: false,
    message: "",
    title: "",
    type: "",
  });

  return (
    <Context.Provider
      value={{
        state: {
          isLoading: isLoading,
          isBlockingLoading: isBlockingLoading,
          message: message,
        },
        setLoading: setIsLoading,
        setBlockingLoading: setBlockingLoading,
        setMessage: setMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const AppContext = () => useContext(Context);

export default Provider;
