"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type RecognitionResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };

type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: RecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type RecognitionConstructor = new () => Recognition;

function getRecognition() {
  const scope = window as unknown as { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition;
}

export function useVoiceSearch(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<Recognition | null>(null);
  const resultRef = useRef(onResult);

  useEffect(() => {
    resultRef.current = onResult;
  }, [onResult]);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const toggle = useCallback((): boolean => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      return true;
    }
    const RecognitionClass = getRecognition();
    if (!RecognitionClass) return false;

    const recognition = new RecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => resultRef.current(event.results[0]?.[0]?.transcript ?? "");
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
    };
    recognition.onerror = recognition.onend;
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
    return true;
  }, []);

  return { listening, toggle };
}
