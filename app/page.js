"use client";
import TextDisplay from "@/components/TextDisplay";
import TypingArea from "@/components/TypingArea";
import TimeDisplay from "@/components/TimeDisplay";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useEffect, useState } from "react";

export default function Home() {
  const [textToWrite, setTextToWrite] = useState("");

  const [writtenText, setWrittenText] = useState("");

  const [correctCounter, setCorrectCounter] = useState(0);

  const [running, setRunning] = useState(false);
  const [timePassed, setTimePassed] = useState(0);

  const wrongCounter = writtenText.length - correctCounter
  const [totalWrongs, setTotalWrongs] = useState(0);


  function addTotalWrong() {
    setTotalWrongs(totalWrongs + 1)
  }


  function getCorrectCharacters(text) {
    for (let i = 0; i < text.length; i++) {
      if (textToWrite.charAt(i) != text.charAt(i)) {
        return i;

      }
    }
    return text.length
  }
  function onWrittenText(text) {
    setWrittenText(text)
    const correct = getCorrectCharacters(text)
    setCorrectCounter(correct)
    if (correct == textToWrite.length) onTextFinished()
  }

  function onTextFinished() {
    setRunning(false)
  }

  function runTimer() {
    setTimeout(() => {
      if (running) setTimePassed(timePassed + 0.1);
    }, 100);
  }

  useEffect(() => {
    runTimer();
  }, [timePassed, running]);

  function Start() {
    setWrittenText("")
    setTotalWrongs(0)
    setCorrectCounter(0)
    setTimePassed(0)
    fetch("/text_to_write.txt").then((response) => response.text()).then((text) => {
      const index = Math.floor(Math.random() * (text.split("\n").length - 7))
      console.log(index)
      console.log(text.split("\n").slice(index, index + 7).join("\n"))
      setTextToWrite(text.split("\n").slice(index, index + 7).join("\n"))
    })
    setRunning(true)
    runTimer()
  }

  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <h1 className="text-3xl ">Typing test for programmers</h1>
      <TimeDisplay time={timePassed.toFixed(1)} />
      {
        writtenText.length && !running > 0 ? <TextDisplay text={textToWrite} correct={correctCounter} wrong={wrongCounter} /> : ""
      }
      {
        running ? <>
      <TextDisplay text={textToWrite} correct={correctCounter} wrong={wrongCounter} />
          <TypingArea text={writtenText} setText={onWrittenText} addWrong={addTotalWrong} /></> :
          <button className="m-2 py-3 px-7 border border-gray-900 rounded-sm" onClick={Start}>Start</button>
      }
      {
        (!running && writtenText.length > 0) ? <ResultsDisplay time={timePassed.toFixed(1)} wpm={(textToWrite.replace(/[-+.,=[\]{}<>())]/g, " ").split(" ").length / (timePassed / 60)).toFixed(1)} accuracy={((correctCounter / (correctCounter + totalWrongs)) * 100).toFixed(1)} />
          : ""
      }
    </div>
  );
}
