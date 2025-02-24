import React, { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

function Room() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);

  const myMeeting = () => {
    const appID = +import.meta.env.VITE_APP_ID;
    const serverSecret = import.meta.env.VITE_SECRET;
    if (!videoContainerRef.current) {
      console.error("Video container is not available.");
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      Date.now().toString(),
      "Tony Start"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    if (!zp) {
      console.error("Failed to create Zego instance.");
      return;
    }
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?type=" +
            encodeURIComponent("group-call"),
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
        //   type === "one-on-one"
        //     ? ZegoUIKitPrebuilt.OneONoneCall
        //     : ZegoUIKitPrebuilt.GroupCall,
      },
      //   maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        setMeet(false);
        navigate(-1);
      },
    });
  };

  const handleExit = () => {
    // if (zpRef.current) {
    //   zpRef.current.destroy();
    // }
    setJoined(false);
    navigate(-1);
  };

  useEffect(() => {
    myMeeting();

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [id, navigate]);

  return (
    <div className="flex items-start justify-between gap-3">
      <div
        ref={videoContainerRef}
        className="flex-1"
        // className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99]"
      />
      {!joined && (
        <>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleExit()}
              className="px-3 py-2 text-red-400 text-lg font-jetbrains rounded-lg border border-border"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Room;
