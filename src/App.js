import React, { useState } from "react";
import PokerGame from "./Components/PokerGame";
import StartupDialog from "./Components/StartupDialog";
import "./Styles/styles.css";

function App() {
  const [showStartupDialog, setShowStartupDialog] = useState(true);
  const [hasExistingSettings, setHasExistingSettings] = useState(
    localStorage.getItem("soundSettings") !== null
  );
  const [initialAction, setInitialAction] = useState(null); // 1. Add initialAction state

  // 2. Create handlers
  const handlePlay = () => {
    setShowStartupDialog(false);
    setInitialAction('play');
  };

  const handleShowSettings = () => {
    setShowStartupDialog(false);
    setInitialAction('settings');
  };

  const handleShowRules = () => {
    setShowStartupDialog(false);
    setInitialAction('rules');
  };

  return (
    <div className="App">
      {showStartupDialog ? (
        <StartupDialog
          // 3. Pass new handlers to StartupDialog
          onPlay={handlePlay}
          onSettings={handleShowSettings}
          onRules={handleShowRules}
          hasExistingSettings={hasExistingSettings}
        />
      ) : (
        // 4. Pass initialAction to PokerGame
        <PokerGame initialAction={initialAction} />
      )}
    </div>
  );
}

export default App;
