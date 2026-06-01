import React, { useEffect, useCallback, useState, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/stores";
import { getSocket } from "../api/socket";
import { PhoneOff, Mic, MicOff, Video, VideoOff, ArrowLeft, Monitor, MonitorOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PageContainer,
  Header,
  BackButton,
  HeaderContent,
  StatusBadge,
  CallTimer,
  VideoContainer,
  MainVideoBox,
  PipVideoBox,
  VideoOverlay,
  VideoLabel,
  MuteIndicator,
  CallControlsContainer,
  ControlBtn,
  EmptyMessage,
  WaitingMessage,
} from "../styles/CallPage.styles";
import { useCallContext } from "../components/call/callContext";

interface RemoteUser {
  userId: string;
  username: string;
}

interface IncomingCallData {
  from: string;
  fromEmail: string;
  fromUsername: string;
  offer: RTCSessionDescriptionInit;
  callType: "audio" | "video";
  conversationId: string;
}

const debugLog = (title: string, data?: any) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${title}`, data || "");
};

const CallTimerDisplay: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [displayTime, setDisplayTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayTime(0);
      durationRef.current = 0;
      return;
    }

    durationRef.current = 0;
    timerRef.current = setInterval(() => {
      durationRef.current += 1;
      setDisplayTime(durationRef.current);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <CallTimer>{formatTime(displayTime)}</CallTimer>;
};

const CallPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = getSocket();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const state = location.state as {
    conversationId: string;
    remoteUserId: string;
    remoteUsername: string;
    isInitiator: boolean;
    incomingCall?: IncomingCallData;
  } | null;

  const streamsMapRef = useRef<{
    local: MediaStream | null;
    remote: MediaStream | null;
    screen: MediaStream | null;
  }>({
    local: null,
    remote: null,
    screen: null,
  });

  const { activeConversation } = useSelector((state: RootState) => state.chats);

  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [callActive, setCallActive] = useState(false);
  const [remoteUser, setRemoteUser] = useState<RemoteUser | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [remoteMicOn, setRemoteMicOn] = useState(true);
  const [remoteVideoOn, setRemoteVideoOn] = useState(true);
  const [remoteScreenSharing, setRemoteScreenSharing] = useState(false);
  const [isPipSwapped, setIsPipSwapped] = useState(false);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const incomingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);
  const iceCandidatesRef = useRef<RTCIceCandidate[]>([]);
  const remoteSocketIdRef = useRef<string | null>(null);
  const initCallRef = useRef(false);
  const acceptCallRef = useRef(false);
  const mySocketIdRef = useRef<string | null>(null);
  const screenShareSenderRef = useRef<RTCRtpSender | null>(null);
  const { setActiveCall, setIsOnCallPage, setRemoteSocketId: setContextRemoteSocketId } = useCallContext();

  useEffect(() => {
    streamsMapRef.current.local = myStream;
    debugLog("📍 Local stream updated in map", {
      streamId: myStream?.id,
      tracks: myStream?.getTracks().length,
    });
  }, [myStream]);

  useEffect(() => {
    streamsMapRef.current.remote = remoteStream;
    debugLog("📍 Remote stream updated in map", {
      streamId: remoteStream?.id,
      tracks: remoteStream?.getTracks().length,
    });
  }, [remoteStream]);

  useEffect(() => {
    streamsMapRef.current.screen = screenStream;
    debugLog("📍 Screen stream updated in map", {
      streamId: screenStream?.id,
      tracks: screenStream?.getTracks().length,
    });
  }, [screenStream]);

  useEffect(() => {
    if (socket) {
      mySocketIdRef.current = socket.id || null;
      debugLog("🔌 Socket connected", { mySocketId: mySocketIdRef.current });
    }
  }, [socket]);

  useEffect(() => {
    if (!state) {
      navigate("/");
    } else {
      debugLog("📋 Call page initialized", {
        isInitiator: state.isInitiator,
        remoteUserId: state.remoteUserId,
        remoteUsername: state.remoteUsername,
      });

      setRemoteUser({
        userId: state.remoteUserId,
        username: state.remoteUsername,
      });

      if (state.incomingCall?.offer) {
        incomingOfferRef.current = state.incomingCall.offer;
        remoteSocketIdRef.current = state.incomingCall.from;
        setContextRemoteSocketId(state.incomingCall.from);
        debugLog("✅ Incoming call set up", { remoteSocketId: state.incomingCall.from });
      }
    }
  }, []);

  const getUserMediaStream = useCallback(async () => {
    try {
      debugLog("📹 Requesting media devices...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      
      const audioTracks = stream.getAudioTracks();
      const videoTracks = stream.getVideoTracks();
      debugLog("✅ Media stream obtained", {
        audioTracks: audioTracks.length,
        videoTracks: videoTracks.length,
        audioEnabled: audioTracks[0]?.enabled,
        videoEnabled: videoTracks[0]?.enabled,
      });
      
      return stream;
    } catch (error) {
      debugLog("❌ Error accessing media", error);
      alert("Please allow camera and microphone access");
      return null;
    }
  }, []);

  const getScreenStream = useCallback(async () => {
    try {
      debugLog("📺 Requesting screen share...");
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
        } as MediaTrackConstraints,
        audio: false,
      });

      debugLog("✅ Screen stream obtained", {
        videoTracks: stream.getVideoTracks().length,
      });

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          debugLog("📺 User stopped screen share");
          stopScreenShare();
        };
      }

      return stream;
    } catch (error) {
      debugLog("❌ Error accessing screen", error);
      return null;
    }
  }, []);

  const initializePeerConnection = useCallback(() => {
    debugLog("🔄 Creating peer connection...");
    
    const config: RTCConfiguration = {
      iceServers: [
        { urls: ["stun:stun.l.google.com:19302"] },
        { urls: ["stun:stun1.l.google.com:19302"] },
        { urls: ["stun:stun2.l.google.com:19302"] },
        { urls: ["stun:stun3.l.google.com:19302"] },
        { urls: ["stun:stun4.l.google.com:19302"] },
        
        {
          urls: ["turn:numb.viagenie.ca"],
          username: "webrtc@live.com",
          credential: "webrtc"
        },
        {
          urls: ["turn:openrelay.metered.ca:80"],
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: ["turn:openrelay.metered.ca:443"],
          username: "openrelayproject",
          credential: "openrelayproject",
        },
      ],
    };

    const pc = new RTCPeerConnection(config);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        debugLog("🧊 ICE candidate generated", {
          candidate: event.candidate.candidate,
          foundation: event.candidate.foundation,
        });
        if (remoteSocketIdRef.current) {
          socket?.emit("ice-candidate", {
            to: remoteSocketIdRef.current,
            candidate: event.candidate,
          });
        }
      } else {
        debugLog("✅ ICE gathering complete");
      }
    };

    pc.ontrack = (event) => {
      debugLog("✅ Remote track received", {
        kind: event.track.kind,
        enabled: event.track.enabled,
        readyState: event.track.readyState,
        streams: event.streams.length,
      });

      if (event.streams && event.streams[0]) {
        debugLog("📊 Setting remote stream", { streamId: event.streams[0].id });
        setRemoteStream(event.streams[0]);
      }
    };

    pc.onconnectionstatechange = () => {
      debugLog("🔗 Connection state changed", { state: pc.connectionState });

      if (pc.connectionState === "connected") {
        debugLog("✅ Peer connection established!");
        setCallActive(true);
      } else if (pc.connectionState === "failed") {
        debugLog("❌ Connection failed - check ICE servers and network");
      }
    };

    pc.oniceconnectionstatechange = () => {
      debugLog("❄️ ICE connection state", { state: pc.iceConnectionState });
    };

    pc.onsignalingstatechange = () => {
      debugLog("📡 Signaling state", { state: pc.signalingState });
    };

    return pc;
  }, [socket]);

  const addStreamToPeer = useCallback(
    (pc: RTCPeerConnection, stream: MediaStream) => {
      debugLog("📤 Adding local stream to peer connection", {
        streamId: stream.id,
        tracks: stream.getTracks().length,
      });

      const senders: RTCRtpSender[] = [];
      stream.getTracks().forEach((track) => {
        debugLog(`  ├─ Adding ${track.kind} track`, {
          trackId: track.id,
          enabled: track.enabled,
          readyState: track.readyState,
        });
        const sender = pc.addTrack(track, stream);
        senders.push(sender);
      });

      debugLog(`📊 Total senders: ${senders.length}`);
    },
    []
  );

  const startScreenShare = useCallback(async () => {
    if (!peerConnectionRef.current || !myStream) {
      debugLog("❌ Cannot start screen share: no peer connection or myStream");
      return false;
    }

    try {
      const screen = await getScreenStream();
      if (!screen) return false;

      const screenVideoTrack = screen.getVideoTracks()[0];
      if (!screenVideoTrack) {
        debugLog("❌ No video track in screen stream");
        return false;
      }

      setScreenStream(screen);

      const videoSender = peerConnectionRef.current
        .getSenders()
        .find((sender) => sender.track?.kind === "video");

      if (videoSender) {
        debugLog("📺 Replacing video track with screen share");
        await videoSender.replaceTrack(screenVideoTrack);
        screenShareSenderRef.current = videoSender;
      } else {
        debugLog("📺 Adding screen share as new track");
        const sender = peerConnectionRef.current.addTrack(screenVideoTrack, screen);
        screenShareSenderRef.current = sender;
      }

      setIsScreenSharing(true);
      debugLog("✅ Screen sharing started");

      socket?.emit("user-status-change", {
        to: remoteSocketIdRef.current,
        type: "screen-share",
        state: true,
      });

      return true;
    } catch (error) {
      debugLog("❌ Error starting screen share", error);
      return false;
    }
  }, [myStream, getScreenStream, socket]);

  const stopScreenShare = useCallback(async () => {
    if (!peerConnectionRef.current || !myStream || !screenStream) {
      debugLog("❌ Cannot stop screen share: missing peer connection or streams");
      return false;
    }

    try {
      const cameraVideoTrack = myStream.getVideoTracks()[0];

      if (screenShareSenderRef.current && cameraVideoTrack) {
        debugLog("📷 Replacing screen share with camera");
        await screenShareSenderRef.current.replaceTrack(cameraVideoTrack);
      }

      screenStream.getTracks().forEach((track) => {
        track.stop();
      });

      setScreenStream(null);
      screenShareSenderRef.current = null;
      setIsScreenSharing(false);
      debugLog("✅ Screen sharing stopped");

      // ✅ Notify remote user
      socket?.emit("user-status-change", {
        to: remoteSocketIdRef.current,
        type: "screen-share",
        state: false,
      });

      return true;
    } catch (error) {
      debugLog("❌ Error stopping screen share", error);
      return false;
    }
  }, [myStream, screenStream, socket]);

  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      return await stopScreenShare();
    } else {
      return await startScreenShare();
    }
  }, [isScreenSharing, startScreenShare, stopScreenShare]);

  useEffect(() => {
    setIsOnCallPage(true);
    return () => setIsOnCallPage(false);
  }, [setIsOnCallPage]);

  useEffect(() => {
    if (!state?.isInitiator || !state?.remoteUserId || initCallRef.current) {
      return;
    }

    debugLog("🎬 INITIATOR: Starting call initialization");

    setActiveCall({
      conversationId: state.conversationId,
      remoteUserId: state.remoteUserId,
      remoteUsername: state.remoteUsername,
      isInitiator: state.isInitiator,
      incomingCall: state.incomingCall,
      startTime: Date.now(),
    });

    initCallRef.current = true;

    let isMounted = true;
    const initiateCall = async () => {
      try {
        debugLog("📱 INITIATOR: Getting media stream");
        let stream = myStream;
        if (!stream) {
          stream = await getUserMediaStream();
          if (!isMounted) return;
          setMyStream(stream);
        }

        if (!stream) {
          debugLog("❌ INITIATOR: Failed to get media stream");
          alert("Could not access camera/microphone");
          return;
        }

        debugLog("🔄 INITIATOR: Creating peer connection");
        const pc = initializePeerConnection();
        if (!isMounted) return;

        peerConnectionRef.current = pc;

        addStreamToPeer(pc, stream);

        await new Promise((resolve) => setTimeout(resolve, 100));

        debugLog("📝 INITIATOR: Creating offer");
        const offer = await pc.createOffer();
        debugLog("✅ INITIATOR: Offer created", {
          sdpLength: offer.sdp?.length,
        });

        await pc.setLocalDescription(offer);
        debugLog("✅ INITIATOR: Local description set");

        debugLog("📤 INITIATOR: Sending offer to remote user", {
          remoteUserId: state.remoteUserId,
        });
        socket?.emit("user:call", {
          to: state.remoteUserId,
          offer: offer,
          userName: currentUser?.username,
          conversationId: activeConversation?._id,
        });

        debugLog("⏳ INITIATOR: Waiting for answer...");
      } catch (error) {
        debugLog("❌ INITIATOR: Error", error);
      }
    };

    initiateCall();

    return () => {
      isMounted = false;
    };
  }, [
    state?.isInitiator,
    state?.remoteUserId,
    socket,
    currentUser?.username,
    activeConversation?._id,
    initializePeerConnection,
    addStreamToPeer,
    getUserMediaStream,
    setActiveCall,
  ]);

  useEffect(() => {
    if (state?.isInitiator || callAccepted || !incomingOfferRef.current || acceptCallRef.current) {
      return;
    }

    debugLog("🎬 ACCEPTOR: Starting call acceptance");

    if (state) {
      setActiveCall({
        conversationId: state.conversationId,
        remoteUserId: state.remoteUserId,
        remoteUsername: state.remoteUsername,
        isInitiator: state.isInitiator,
        incomingCall: state.incomingCall,
        startTime: Date.now(),
      });
    }

    acceptCallRef.current = true;

    let isMounted = true;
    const acceptCall = async () => {
      if (!incomingOfferRef.current) return;

      try {
        debugLog("📱 ACCEPTOR: Getting media stream");
        let stream = myStream;
        if (!stream) {
          stream = await getUserMediaStream();
          if (!isMounted) return;
          setMyStream(stream);
        }

        if (!stream) {
          debugLog("❌ ACCEPTOR: Failed to get media stream");
          alert("Could not access camera/microphone");
          return;
        }

        debugLog("🔄 ACCEPTOR: Creating peer connection");
        const pc = initializePeerConnection();
        if (!isMounted) return;

        peerConnectionRef.current = pc;

        addStreamToPeer(pc, stream);

        debugLog("📥 ACCEPTOR: Setting remote description (offer)");
        await pc.setRemoteDescription(
          new RTCSessionDescription(incomingOfferRef.current)
        );
        debugLog("✅ ACCEPTOR: Remote description set");

        debugLog(`📦 ACCEPTOR: Processing ${iceCandidatesRef.current.length} buffered ICE candidates`);
        for (const candidate of iceCandidatesRef.current) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (error) {
            debugLog("⚠️ Error adding buffered ICE candidate", error);
          }
        }
        iceCandidatesRef.current = [];

        debugLog("📝 ACCEPTOR: Creating answer");
        const answer = await pc.createAnswer();
        debugLog("✅ ACCEPTOR: Answer created", {
          sdpLength: answer.sdp?.length,
        });

        await pc.setLocalDescription(answer);
        debugLog("✅ ACCEPTOR: Local description set");

        debugLog("📤 ACCEPTOR: Sending answer", {
          to: remoteSocketIdRef.current,
        });
        socket?.emit("call-answer", {
          to: remoteSocketIdRef.current,
          answer: answer,
        });

        setCallAccepted(true);
        debugLog("⏳ ACCEPTOR: Answer sent, waiting for connection...");
      } catch (error) {
        debugLog("❌ ACCEPTOR: Error", error);
        alert("Failed to accept call");
      }
    };

    acceptCall();

    return () => {
      isMounted = false;
    };
  }, [state?.isInitiator, callAccepted, socket, initializePeerConnection, addStreamToPeer, getUserMediaStream, setActiveCall]);

  const handleCallAnswer = useCallback(
    async ({ answer, from }: { answer: RTCSessionDescriptionInit; from?: string }) => {
      debugLog("📥 Call answer received", { from });

      if (peerConnectionRef.current) {
        try {
          if (from) {
            remoteSocketIdRef.current = from;
            setContextRemoteSocketId(from);
            debugLog("✅ Remote socket ID updated", { from });
          }

          debugLog("📥 Setting remote description (answer)");
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
          debugLog("✅ Remote description set");

          setCallActive(true);

          debugLog(`📦 Processing ${iceCandidatesRef.current.length} buffered ICE candidates`);
          for (const candidate of iceCandidatesRef.current) {
            try {
              await peerConnectionRef.current.addIceCandidate(
                new RTCIceCandidate(candidate)
              );
            } catch (error) {
              debugLog("⚠️ Error adding buffered ICE candidate", error);
            }
          }
          iceCandidatesRef.current = [];
        } catch (error) {
          debugLog("❌ Error setting remote description", error);
        }
      }
    },
    [setContextRemoteSocketId]
  );

  const handleIceCandidate = useCallback(
    async ({ candidate }: { candidate: RTCIceCandidate }) => {
      if (!peerConnectionRef.current || !candidate) {
        return;
      }

      if (!peerConnectionRef.current.remoteDescription) {
        debugLog("📦 Buffering ICE candidate (remote description not set yet)", {
          candidate: candidate.candidate,
        });
        iceCandidatesRef.current.push(candidate);
        return;
      }

      try {
        debugLog("🧊 Adding ICE candidate", {
          candidate: candidate.candidate?.substring(0, 50) + "...",
        });
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (error) {
        debugLog("⚠️ Error adding ICE candidate", error);
      }
    },
    []
  );

  const toggleMic = useCallback(() => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      const newState = !isMicOn;
      setIsMicOn(newState);
      debugLog("🎤 Mic toggled", { enabled: newState });

      socket?.emit("user-status-change", {
        to: remoteSocketIdRef.current,
        type: "mic",
        state: newState,
      });
    }
  }, [myStream, isMicOn, socket]);

  const toggleVideo = useCallback(() => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      const newState = !isVideoOn;
      setIsVideoOn(newState);
      debugLog("📹 Video toggled", { enabled: newState });

      socket?.emit("user-status-change", {
        to: remoteSocketIdRef.current,
        type: "video",
        state: newState,
      });
    }
  }, [myStream, isVideoOn, socket]);

  const endCallSteps = useCallback(() => {
    debugLog("🧹 Cleaning up call steps");
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }

    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });
    }
    setCallActive(false);
    setIsMicOn(true);
    setIsVideoOn(true);
    setCallAccepted(false);
    setActiveCall(null);
    iceCandidatesRef.current = [];
  }, [remoteStream, myStream, setActiveCall]);

  const endCall = useCallback(() => {
    debugLog("🔴 END CALL triggered");

    if (peerConnectionRef.current) {
      debugLog("  ├─ Closing peer connection");
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (remoteStream) {
      debugLog("  ├─ Stopping remote stream tracks");
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }

    if (myStream) {
      debugLog("  ├─ Stopping local stream tracks");
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
    }

    if (screenStream) {
      debugLog("  ├─ Stopping screen stream tracks");
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }

    setActiveCall(null);
    setContextRemoteSocketId(null);
    setIsScreenSharing(false);
    screenShareSenderRef.current = null;

    if (remoteSocketIdRef.current) {
      debugLog("  └─ Notifying remote user", { to: remoteSocketIdRef.current });
      socket?.emit("call-ended", {
        to: remoteSocketIdRef.current,
      });
    }

    setTimeout(() => {
      navigate("/home");
    }, 500);
  }, [socket, navigate, setActiveCall, setContextRemoteSocketId, myStream, remoteStream, screenStream]);

  useEffect(() => {
    if (!socket) return;

    const handleCallInitiated = ({ remoteSocketId }: { remoteSocketId: string }) => {
      debugLog("✅ Call initiated event received", { remoteSocketId });
      remoteSocketIdRef.current = remoteSocketId;
      setContextRemoteSocketId(remoteSocketId);
    };

    const handleCallEnded = () => {
      debugLog("📴 Remote user ended the call");
      endCallSteps();
      setTimeout(() => {
        navigate("/home");
      }, 500);
    };

    const handleStatusChange = ({ type, state }: { type: string; state: boolean }) => {
      debugLog(`📡 Remote ${type} status changed`, { state });
      if (type === "mic") {
        setRemoteMicOn(state);
      } else if (type === "video") {
        setRemoteVideoOn(state);
      } else if (type === "screen-share") {
        setRemoteScreenSharing(state);
        debugLog(state ? "📺 Remote user started screen sharing" : "📺 Remote user stopped screen sharing");
      }
    };

    socket.on("call-answer", handleCallAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("call-initiated", handleCallInitiated);
    socket.on("call-rejected", () => {
      debugLog("❌ Call rejected by remote user");
      navigate(-1);
      endCallSteps();
    });
    socket.on("call-ended", handleCallEnded);
    socket.on("user-status-change", handleStatusChange);

    return () => {
      socket.off("call-answer", handleCallAnswer);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("call-initiated", handleCallInitiated);
      socket.off("call-rejected", () => {});
      socket.off("call-ended", handleCallEnded);
      socket.off("user-status-change", handleStatusChange);
    };
  }, [socket, handleCallAnswer, handleIceCandidate, endCallSteps, navigate, setContextRemoteSocketId]);

  if (!state) {
    return null;
  }

  const mainStream = isPipSwapped ? myStream : remoteStream;
  const mainUser = isPipSwapped ? "You" : remoteUser?.username;
  const mainMicOn = isPipSwapped ? isMicOn : remoteMicOn;
  const mainVideoOn = isPipSwapped ? isVideoOn : remoteVideoOn;

  const pipStream = isPipSwapped ? remoteStream : myStream;
  const pipUser = isPipSwapped ? remoteUser?.username : "You";
  const pipMicOn = isPipSwapped ? remoteMicOn : isMicOn;
  const pipVideoOn = isPipSwapped ? remoteVideoOn : isVideoOn;

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);

  const setMainVideoRef = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    
    mainVideoRef.current = video;
    
    if (mainStream) {
      debugLog("🎬 Setting mainStream to video element", {
        streamId: mainStream.id,
        tracks: mainStream.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled })),
      });
      
      video.srcObject = null;
      
      setTimeout(() => {
        if (video && mainStream) {
          video.srcObject = mainStream;
          debugLog("✅ mainStream set to srcObject");
          
          const handleLoadedMetadata = () => {
            debugLog("✅ mainVideo loaded metadata", {
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
            });
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
          };
          
          video.addEventListener("loadedmetadata", handleLoadedMetadata);
          
          video.play()
            .then(() => debugLog("▶️ mainVideo playing"))
            .catch((err) => debugLog("❌ mainVideo play error", err.message));
        }
      }, 0);
    }
  }, [mainStream]);

  const setPipVideoRef = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    
    pipVideoRef.current = video;
    
    if (pipStream) {
      debugLog("🎬 Setting pipStream to video element", {
        streamId: pipStream.id,
        tracks: pipStream.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled })),
      });
      
      video.srcObject = null;
      
      setTimeout(() => {
        if (video && pipStream) {
          video.srcObject = pipStream;
          debugLog("✅ pipStream set to srcObject");
          
          const handleLoadedMetadata = () => {
            debugLog("✅ pipVideo loaded metadata", {
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
            });
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
          };
          
          video.addEventListener("loadedmetadata", handleLoadedMetadata);
          
          video.play()
            .then(() => debugLog("▶️ pipVideo playing"))
            .catch((err) => debugLog("❌ pipVideo play error", err.message));
        }
      }, 0);
    }
  }, [pipStream]);

  return (
    <PageContainer>
      <Header>
        <BackButton
          onClick={() => {
            setIsOnCallPage(false);
            navigate(-1);
          }}
        >
          <ArrowLeft size={20} />
          Back
        </BackButton>
        <HeaderContent>
          <h1>🎥 Call</h1>
          <StatusBadge $active={callActive || callAccepted}>
            {callActive || callAccepted
              ? `Connected to ${remoteUser?.username}`
              : state.isInitiator
              ? "Calling..."
              : "Incoming Call..."}
          </StatusBadge>
          {(callActive || callAccepted) && <CallTimerDisplay isActive={callActive || callAccepted} />}
        </HeaderContent>
      </Header>

      {(callActive || callAccepted) && (mainStream || pipStream) ? (
        <VideoContainer>
          <MainVideoBox>
            <video
              ref={setMainVideoRef}
              autoPlay
              muted={isPipSwapped}
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "#000",
              }}
            />
            <VideoOverlay $noVideo={!mainVideoOn}>{!mainVideoOn && <div>📷</div>}</VideoOverlay>
            <VideoLabel>
              <span>{mainUser}</span>
              {!mainMicOn && (
                <MuteIndicator>
                  <MicOff size={14} />
                </MuteIndicator>
              )}
            </VideoLabel>
          </MainVideoBox>

          <PipVideoBox onClick={() => setIsPipSwapped(!isPipSwapped)}>
            <video
              ref={setPipVideoRef}
              autoPlay
              muted={!isPipSwapped}
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundColor: "#000",
              }}
            />
            <VideoOverlay $noVideo={!pipVideoOn}>{!pipVideoOn && <div>📷</div>}</VideoOverlay>
            <VideoLabel>
              <span>{pipUser}</span>
              {!pipMicOn && (
                <MuteIndicator>
                  <MicOff size={14} />
                </MuteIndicator>
              )}
            </VideoLabel>
          </PipVideoBox>
        </VideoContainer>
      ) : (callActive || callAccepted) ? (
        <EmptyMessage>📹 Connecting video...</EmptyMessage>
      ) : (
        <WaitingMessage>
          {state.isInitiator
            ? "📞 Calling " + remoteUser?.username + "..."
            : "📞 Waiting for " + remoteUser?.username + " response..."}
        </WaitingMessage>
      )}

      {/* ✅ Screen Share Indicator */}
      {remoteScreenSharing && (
        <div style={{
          position: "absolute",
          top: 80,
          right: 20,
          backgroundColor: "#ff6b6b",
          color: "white",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "bold",
          zIndex: 100,
        }}>
          📺 {remoteUser?.username} is sharing screen
        </div>
      )}

      {(callActive || callAccepted) && (
        <CallControlsContainer>
          <ControlBtn
            $type="mic"
            $off={!isMicOn}
            onClick={toggleMic}
            title={isMicOn ? "Mute" : "Unmute"}
          >
            {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
          </ControlBtn>

          <ControlBtn
            $type="video"
            $off={!isVideoOn}
            onClick={toggleVideo}
            title={isVideoOn ? "Stop Video" : "Start Video"}
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </ControlBtn>

          {/* ✅ Screen Share Button */}
          <ControlBtn
            $type="screen"
            $off={!isScreenSharing}
            onClick={toggleScreenShare}
            title={isScreenSharing ? "Stop Screen Share" : "Start Screen Share"}
          >
            {isScreenSharing ? <Monitor size={24} /> : <MonitorOff size={24} />}
          </ControlBtn>

          <ControlBtn $type="end" onClick={endCall} title="End Call">
            <PhoneOff size={20} /> End Call
          </ControlBtn>
        </CallControlsContainer>
      )}
    </PageContainer>
  );
};

export default CallPage;