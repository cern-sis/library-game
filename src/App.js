import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

function App() {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [step, setStep] = useState(0);
  const [error, showError] = useState(false);
  const [help, showHelp] = useState(false);

  const messageHelp = (
    <>
      <TerminalOutput>
        <p>
          Try to crack the code, type{" "}
          <span style={{ color: "red" }}>
            <strong>clear</strong>
          </span>{" "}
          to try again! Remember that the code is a number, so you can't use
          letters.
        </p>
      </TerminalOutput>
    </>
  );
  const messageError = (
    <>
      <TerminalOutput>
        There was an error, please type{" "}
        <span style={{ color: "red" }}>
          <strong>clear</strong>
        </span>{" "}
        to start again! Remember that the code is a number, so you can't use
        letters.
      </TerminalOutput>
    </>
  );

  const steps = {
    0: "Enter number for `x`",
    1: "Enter number for `y`",
    2: "The code number is:",
  };

  const calculateCode = () => {
    if (!x || !y) {
      showError(true);
      return;
    }
    const yNumber = parseInt(y);
    const xNumber = parseInt(x);
    if (!Number.isInteger(yNumber) && !Number.isInteger(xNumber)) {
      showError(true);
      return;
    }
    try {
      return 9000 + xNumber - yNumber;
    } catch (e) {
      console.log("error", e);
      showError(true);
    }
  };

  const onEnterPressed = (input) => {
    if (input === "clear") {
      setStep(0);
      showError(false);
      showHelp(false);
      setX(null);
      setY(null);
      return;
    }
    if (input === "help") {
      setStep(0);
      showError(false);
      showHelp(true);
      setX(null);
      setY(null);
      return;
    }

    if (step === 0) {
      setStep(1);
      setX(input);
    } else if (step === 1) {
      setStep(2);
      setY(input);
    } else if (step === 2) {
      setStep(0);
      setX(null);
      setY(null);
    }
  };

  const renderPrompt = () => (
    <>
      <TerminalOutput>
        <p>{steps[step]}</p>
      </TerminalOutput>
      {step === 2 && (
        <TerminalOutput>
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "2rem" }}
          >
            {x !== null && y !== null && calculateCode()}
          </span>
        </TerminalOutput>
      )}
    </>
  );

  return (
    <div className="container">
      <Terminal
        height="100vh"
        name="Library Code Terminal"
        colorMode={ColorMode.Dark}
        onInput={onEnterPressed}
      >
        <TerminalOutput>
          <h1>Welcome to the library's terminal</h1>
        </TerminalOutput>
        <TerminalOutput></TerminalOutput>
        <TerminalOutput>
          The following example commands are provided:
        </TerminalOutput>
        <TerminalOutput>- 'clear' - clear the terminal.</TerminalOutput>
        <TerminalOutput>- 'help' - display a help message.</TerminalOutput>
        <TerminalOutput></TerminalOutput>
        <TerminalOutput>
          <p>
            <strong>Add the missing numbers to get the door's code!</strong>
          </p>
        </TerminalOutput>

        {!error && help && messageHelp}
        {error && !help && messageError}
        {!error && !help && renderPrompt()}
      </Terminal>
    </div>
  );
}

export default App;
