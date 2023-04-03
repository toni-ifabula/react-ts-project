import React, { ComponentType, FunctionComponent } from "react";

const TextToSpeechWithWebcamPage = React.lazy(
  () => import("pages/TextToSpeechWithWebcam/TextToSpeechWithWebcam")
);
const SpeechToTextPage = React.lazy(
  () => import("pages/SpeechToText/SpeechToText")
);

export const TextToSpeechWithWebcamUrl = "/text-to-speech-webcam";
export const SpeechToTextUrl = "/speech-to-text";

interface RoutesMapType {
  path: string;
  component: React.LazyExoticComponent<
    ComponentType<FunctionComponent<Record<string, unknown>>>
  >;
}

export const routesMap: RoutesMapType[] = [
  {
    path: TextToSpeechWithWebcamUrl,
    component: TextToSpeechWithWebcamPage,
  },
  {
    path: SpeechToTextUrl,
    component: SpeechToTextPage,
  },
];
