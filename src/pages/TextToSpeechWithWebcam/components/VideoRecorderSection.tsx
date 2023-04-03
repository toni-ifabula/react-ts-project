import React, { useEffect, useRef, useState } from "react";
import "../styles.css";

const mimeType = "video/webm";

export const VideoRecorderSection = () => {
  const [isAllowPermission, setIsAllowPermission] = useState(false);
  const mediaRecorder = useRef<any>(null);
  const liveVideoFeed = useRef<any>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoChunks, setVideoChunks] = useState<any[]>([]);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  const getPermission = async () => {
    setRecordedVideo(null);
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };
        const audioConstraints = { audio: true };
        // create audio and video streams separately
        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        setIsAllowPermission(true);
        //combine both audio and video streams
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        setStream(combinedStream);
        if (liveVideoFeed.current === null) return;
        //set videostream to live feed player
        liveVideoFeed.current.srcObject = videoStream;
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const startRecording = async () => {
    if (!stream) return;

    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localVideoChunks: any[] = [];
    mediaRecorder.current.ondataavailable = (event: {
      data: { size: number };
    }) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };
    setVideoChunks(localVideoChunks);
  };

  const stopRecording = () => {
    setIsAllowPermission(false);
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      setRecordedVideo(videoUrl);
      setVideoChunks([]);
    };
  };

  return (
    <div className="section">
        <>
          <div>
            {isAllowPermission && recordingStatus === "inactive" ? (
              <button onClick={startRecording} type="button">
                Start Recording
              </button>
            ) : null}
            {recordingStatus === "recording" ? (
              <button onClick={stopRecording} type="button">
                Stop Recording
              </button>
            ) : null}
          </div>

          <div className="video-player">
            {!recordedVideo ? (
              <video
                ref={liveVideoFeed}
                autoPlay
                className="live-player"
              ></video>
            ) : null}
            {recordedVideo ? (
              <div className="recorded-player">
                <video
                  className="recorded"
                  src={recordedVideo}
                  controls
                ></video>
                <a download href={recordedVideo}>
                  Download Recording
                </a>
              </div>
            ) : null}
          </div>
        </>
      {/* ) : (
        <>
          <h1>VIDEO-AUDIO PERMISSION IS NOT ALLOWED</h1>
          <button onClick={getPermission}>GET PERMISSION</button>
        </>
      )} */}
    </div>
  );
};
