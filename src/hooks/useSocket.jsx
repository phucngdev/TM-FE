// context/SocketContext.js
import { createContext, useContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient.connect(
      import.meta.env.VITE_HOST_SOCKET
    );

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
