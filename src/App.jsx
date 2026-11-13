
import { useEffect, useState } from "react";
import "./App.css";
import Stats from "./components/Stats";

const paragraphs = [
  "React is a popular JavaScript library used for building interactive user interfaces. It makes web development easier and faster.",
  "Technology continues to change the world by creating new opportunities for learning, communication, and innovation.",
  "Programming is the process of giving instructions to computers to solve problems and build useful applications.",
  "Practice makes progress. Every small improvement in your typing speed helps you become more confident and productive."
];

function App() {
  const [paragraph, setParagraph] = useState(
    paragraphs[Math.floor(Math.random() * paragraphs.length)]
  );

  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Finish test when time reaches zero
  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
    }
  }, [timeLeft]);

  // Handle typing
  const handleTyping = (e) => {
    if (isCompleted) return;

    const value = e.target.value.slice(0, paragraph.length);

    setTypedText(value);

    if (value.length > 0 && !isRunning) {
      setIsRunning(true);
    }

    if (value.length === paragraph.length) {
      setIsRunning(false);
      setIsCompleted(true);
    }
  };

  // Calculate correct characters
  const correctChars = typedText.split("").filter(
    (char, index) => char === paragraph[index]
  ).length;

  // Calculate accuracy
  const accuracy = typedText.length > 0
    ? Math.round((correctChars / typedText.length) * 100)
    : 100;

  // Calculate WPM
  const elapsedTime = 60 - timeLeft;

  const wpm = elapsedTime > 0
    ? Math.round((correctChars / 5) / (elapsedTime / 60))
    : 0;

  // Restart test
  const restartTest = () => {
    let newParagraph = paragraph;

    while (newParagraph === paragraph && paragraphs.length > 1) {
      newParagraph = paragraphs[
        Math.floor(Math.random() * paragraphs.length)
      ];
    }

    setParagraph(newParagraph);
    setTypedText("");
    setTimeLeft(60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  return (
    <div className="app">

      <header className="header">
        <h1>⚡ TYPE RUSH</h1>
        <p>Test your typing speed and accuracy</p>
      </header>

      <main className="container">

        {/* Statistics Component */}
        <Stats
          timeLeft={timeLeft}
          wpm={wpm}
          accuracy={accuracy}
          typedCount={typedText.length}
          totalCount={paragraph.length}
        />

        <section className="typing-card">

          <h2>Typing Challenge</h2>

          <div className="paragraph">
            {paragraph.split("").map((char, index) => {
              let className = "";

              if (index < typedText.length) {
                className =
                  typedText[index] === char ? "correct" : "incorrect";
              }

              return (
                <span key={index} className={className}>
                  {char}
                </span>
              );
            })}
          </div>

          <textarea
            value={typedText}
            onChange={handleTyping}
            disabled={isCompleted}
            placeholder="Start typing here..."
            spellCheck="false"
          />

          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width: `${(typedText.length / paragraph.length) * 100}%`
              }}
            ></div>
          </div>

          {!isRunning && !isCompleted && (
            <p className="instruction">
              Start typing to begin your 60-second test!
            </p>
          )}

          {isCompleted && (
            <div className="result">
              <h2>🎉 Test Completed!</h2>
              <p>Your typing speed: {wpm} WPM</p>
              <p>Your accuracy: {accuracy}%</p>
              <p>Correct characters: {correctChars}</p>
            </div>
          )}

          <button onClick={restartTest}>
            🔄 Restart Test
          </button>

        </section>

      </main>

      <footer>
        <p>© 2026 TYPE RUSH | Built with React JS</p>
      </footer>

    </div>
  );
}

export default App;
