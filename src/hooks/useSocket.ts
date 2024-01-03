import { io, Socket } from "socket.io-client";
import { useCallback } from "react";

const BACK_URL = import.meta.env.MODE === "production" ? "https://api.slack.sukwoo.kr" : "http://localhost:3030";

const sockets: { [key: string]: Socket } = {};

const useSocket = (workspace?: string): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) {
    return [undefined, disconnect];
  }

  if (!sockets[workspace]) {
    sockets[workspace] = io(`${BACK_URL}/ws-${workspace}`, {
      withCredentials: true,
      transports: ["websocket"],
    });

    sockets[workspace].on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  return [sockets[workspace], disconnect];
};

export default useSocket;
