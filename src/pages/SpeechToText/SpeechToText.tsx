import React, { useEffect, useState } from "react";
import styles from "./SpeechToText.module.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "id-id";

export default function SpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState<any>(null);
  const [savedNotes, setSavedNotes] = useState<any>([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event: any) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  return (
    <>
      <h1>Voice Notes</h1>
      <div>
        <div>
          <h2>Current Note</h2>
          {isListening ? (
            <span className={styles.blink}>🎙️</span>
          ) : (
            <span>🛑🎙️</span>
          )}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div>
          <h2>Notes</h2>
          {savedNotes.map((n: any) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
}
