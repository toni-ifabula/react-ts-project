import React, { ChangeEvent, useState } from "react";
import { TextToSpeechSection } from "./components/TextToSpeechSection";
import { VideoRecorderSection } from "./components/VideoRecorderSection";
import "./styles.css";

export default function TextToSpeechWithWebcam() {
  return (
    <div className="container">
      <TextToSpeechSection />
      <VideoRecorderSection />
    </div>
  );
}
