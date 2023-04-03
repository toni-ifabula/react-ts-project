import React, { ChangeEvent, useState } from "react";
import "../styles.css";

export const TextToSpeechSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audioSource, setAudioSource] = useState("");
  const audioSourcePrefix = "data:audio/mpeg;base64,";

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setAudioSource("");
    setInputValue(event.target.value);
  };

  const submitHandler = () => {
    console.log("qwe payload", inputValue);
    const payload = {
      input: {
        ssml: "<speak>" + inputValue + "</speak>",
      },
      voice: {
        languageCode: "id-ID",
        name: "id-ID-Standard-D",
        ssmlGender: "FEMALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    };

    setIsLoading(true);
    fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyByF_YBQD-i_o3c2XlGnz0PsoOtElYQvkQ",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("qwe res", res);
        return res.json();
      })
      .then((json) => {
        setAudioSource(audioSourcePrefix + json.audioContent);
        console.log("qwe json", json.audioContent);
      })
      .catch((err) => {
        console.log("qwe err", err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="section">
      <input type="text" value={inputValue} onChange={onChangeInput} />
      <button
        disabled={isLoading || inputValue.length === 0}
        onClick={submitHandler}
      >
        submit
      </button>
      {/* {audioSource.length > 0 && (
        <audio controls>
          <source src={audioSource} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )} */}
      {audioSource.length > 0 && (
        <button
          onClick={() => {
            const temp = new Audio(audioSource);
            temp.play();
          }}
        >
          play text audio
        </button>
        // <audio controls>
        //   <source src={audioSource} type="audio/mpeg" />
        //   Your browser does not support the audio element.
        // </audio>
      )}
    </div>
  );
};
