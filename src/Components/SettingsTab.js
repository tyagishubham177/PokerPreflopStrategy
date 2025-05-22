import React, { useState, useEffect } from "react"; // Added useEffect
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import StrategyCustomizationModal from './StrategyCustomizationModal.js';
import { initialPokerStrategy } from '../Constants/InitialStrategy.js';
import { POSITION_LABELS } from '../Constants/GameLabels.js';

const CUSTOM_STRATEGY_LS_KEY = 'customPokerStrategy';

const SettingsTab = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [showStrategyModal, setShowStrategyModal] = useState(false);

  const [currentStrategy, setCurrentStrategy] = useState(() => {
    try {
      const savedStrategy = localStorage.getItem(CUSTOM_STRATEGY_LS_KEY);
      if (savedStrategy) {
        // We need to parse the RFI property, as the modal expects the strategy object
        // to have an RFI key containing the positional strategies.
        const parsedOuter = JSON.parse(savedStrategy);
        // The modal's initializeAllStrategies expects an object like { RFI: { UTG: { Raise: [...] } } }
        // However, what we save from the modal is { UTG: [...], MP: [...], ... }
        // So, we need to re-wrap it in an RFI structure for the modal's initialization logic.
        // And when saving, the `onSave` callback from the modal gives us { UTG: [...], MP: [...] }
        // which is what we want to store directly.
        // The `StrategyCustomizationModal`'s `initializeAllStrategies` expects `initialStrategy.RFI`
        // So, when loading, we need to ensure the loaded structure matches what we save.
        // What is saved by `handleSaveStrategy` is the direct output of the modal: an object {POS_KEY: hands[]}
        // This is not `initialPokerStrategy` format.
        // `StrategyCustomizationModal` expects an object where `initialStrategy.RFI[positionKey]` or `initialStrategy.RFI.SB.Raise for Value` exists.
        // Let's store the strategy in the format that `StrategyCustomizationModal`'s `onSave` provides,
        // which is a flat object like { UTG: [], MP: [], ... SB: [] }.
        // And then, when passing to `StrategyCustomizationModal`, we'll wrap it.

        // For now, let's assume what's saved is the *output* of the modal, which is { UTG: [...], ... }
        // The modal's `initializeAllStrategies` needs to be robust enough to handle this,
        // or we adjust what we pass to it.
        // The current `StrategyCustomizationModal` expects `initialStrategy.RFI...`
        // So, when we load from localStorage, we should reconstruct a structure that `StrategyCustomizationModal` can use.
        // The `modifiedStrategies` from the modal is { UTG: ['AA', 'KK'], MP: ['QQ', 'JJ'] }
        // Let's save this directly.
        // When loading, we pass this directly to the modal.
        // The modal's `initializeAllStrategies` needs to be adapted or how we pass `initialStrategy` needs to be.

        // Let's stick to the plan: save the modal's output format.
        // The `initialStrategy` prop of `StrategyCustomizationModal` is used by its `initializeAllStrategies`.
        // That function expects `initialStrategy.RFI.POSITION.Raise` or `initialStrategy.RFI.SB.Raise for Value`
        // The `modifiedStrategies` that `handleSaveStrategy` receives is `{ UTG: [...], MP: [...] }`
        // So, we should save `modifiedStrategies` directly.
        // When loading, we get this `{ UTG: [...], MP: [...] }` object.
        // We then need to pass this to `StrategyCustomizationModal` in a way it understands.
        // The easiest is to adapt `StrategyCustomizationModal` to accept this flat structure.
        // Given I cannot modify the modal now, I will format the loaded strategy to match `initialPokerStrategy` structure.
        const strategyFromModalFormat = JSON.parse(savedStrategy); // This is { UTG: [...], MP: [...] ... }
        
        // Reconstruct into the format expected by StrategyCustomizationModal's `initializeAllStrategies`
        const reconstructedStrategy = { RFI: {} };
        Object.keys(strategyFromModalFormat).forEach(posKey => {
          if (posKey === "SB") {
            // The modal saves SB as a single array. We need to put it back into a structure
            // that `initializeAllStrategies` can understand if it were to be fully compatible
            // with the original `initialPokerStrategy` structure. However, `initializeAllStrategies`
            // for SB *already* combines "Raise for Value" and "Raise as bluff".
            // So, when we save, we save the combined array. When we load, we can pass this combined array.
            // The `StrategyCustomizationModal`'s `initializeAllStrategies` for SB is:
            // `const raiseForValue = getNestedValue(initialStrategy, `${position.strategyPath}.Raise for Value`) || [];`
            // `const raiseAsBluff = getNestedValue(initialStrategy, `${position.strategyPath}.Raise as bluff`) || [];`
            // `strategies[position.key] = Array.from(new Set([...raiseForValue, ...raiseAsBluff]));`
            // So, if we save `SB: ['AA', 'KK']`, and load it, we need to pass it such that it can be found.
            // Let's assume the `strategyFromModalFormat` is the *direct output* of `StrategyCustomizationModal`'s `onSave`.
            // This means `strategyFromModalFormat` is `{ UTG: [...], MP: [...], SB: [...] }`.
            // The modal's `initializeAllStrategies` will then use this.
            // The path `RFI.SB.Raise for Value` will be undefined.
            // This means `StrategyCustomizationModal`'s `initializeAllStrategies` needs to be robust.
            // The current `initializeAllStrategies` in the modal *already* handles `getNestedValue` returning undefined.
            // What makes sense is to save the `modifiedStrategies` object as is.
            // And then when loading, provide it to the modal. The modal's `initializeAllStrategies`
            // needs to be able to take this format.
            // The prompt for StrategyCustomizationModal was:
            // `useEffect` hook: ...it calls `initializeAllStrategies` to deep copy and structure the strategies from `initialStrategy`
            // `initializeAllStrategies` function handles the extraction of hands: For SB, it combines `Raise for Value` and `Raise as bluff`. For other positions, it takes the `Raise` array.
            // This implies `initialStrategy` prop for the modal must be in the `initialPokerStrategy` format.
            // Therefore, when we load from localStorage, we must reconstruct this structure.

            reconstructedStrategy.RFI[posKey] = { // This is for SB
                 // Since the modal's save function combines these, we can put the combined array
                 // into one of them, or make `initializeAllStrategies` smarter.
                 // For simplicity in loading, let's assume the saved SB array is the "Raise" action.
                 // This is a slight mismatch with `initialPokerStrategy`'s SB structure.
                 // Let's put it under "Raise for Value" and leave "Raise as bluff" empty.
                 // The modal will combine them anyway.
                "Raise for Value": strategyFromModalFormat[posKey],
                "Raise as bluff": [] // Or, distribute, but modal combines them.
            };
          } else {
            reconstructedStrategy.RFI[posKey] = { "Raise": strategyFromModalFormat[posKey] };
          }
        });
        return reconstructedStrategy;
      }
    } catch (error) {
      console.error("Failed to load custom strategy from localStorage:", error);
      // localStorage.removeItem(CUSTOM_STRATEGY_LS_KEY); // Optional: clear corrupted data
    }
    return initialPokerStrategy; // Default
  });


  const handleInteraction = () => {};

  const handleSoundToggle = () => {
    handleInteraction();
    setSoundEnabled(!soundEnabled);
  };

  const handleUsernameChange = (event) => {
    handleInteraction();
    setUsername(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    handleInteraction();
    setDifficulty(event.target.value);
  };

  const handleSaveSettings = () => {
    handleInteraction();
    console.log("Settings saved:", { soundEnabled, username, difficulty });
  };

  const handleOpenStrategyModal = () => {
    setShowStrategyModal(true);
  };

  const handleCloseStrategyModal = () => {
    setShowStrategyModal(false);
  };

  const handleSaveStrategy = (modifiedStrategies) => {
    // `modifiedStrategies` is an object like { UTG: [...], MP: [...], ..., SB: [...] }
    try {
      localStorage.setItem(CUSTOM_STRATEGY_LS_KEY, JSON.stringify(modifiedStrategies));
      // We need to convert `modifiedStrategies` (flat structure) 
      // back to the nested structure expected by `currentStrategy` state if we want to keep it consistent.
      const reconstructedStrategy = { RFI: {} };
      Object.keys(modifiedStrategies).forEach(posKey => {
        if (posKey === "SB") {
          reconstructedStrategy.RFI[posKey] = {
            "Raise for Value": modifiedStrategies[posKey],
            "Raise as bluff": [] 
          };
        } else {
          reconstructedStrategy.RFI[posKey] = { "Raise": modifiedStrategies[posKey] };
        }
      });
      setCurrentStrategy(reconstructedStrategy);
      console.log("Custom strategy saved to localStorage and state updated.");
    } catch (error) {
      console.error("Failed to save custom strategy to localStorage:", error);
    }
    handleCloseStrategyModal();
  };

  const handleResetStrategy = () => {
    try {
      localStorage.removeItem(CUSTOM_STRATEGY_LS_KEY);
      setCurrentStrategy(initialPokerStrategy); // Reset state to default
      console.log("Custom strategy reset to default.");
      // Optionally, add a user notification here (e.g., Snackbar)
    } catch (error) {
      console.error("Failed to reset custom strategy:", error);
    }
  };


  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Game Settings
      </Typography>

      {/* Sound, Username, Difficulty settings... */}
      <FormControlLabel
        control={<Switch checked={soundEnabled} onChange={handleSoundToggle} color="primary" />}
        label="Sound Effects"
        sx={{ my: 2 }}
      />
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        margin="normal"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Select
        fullWidth
        label="Difficulty" // This should ideally be "Game Difficulty" or similar
        value={difficulty}
        onChange={handleDifficultyChange}
        margin="dense"
        sx={{ mb: 2 }}
      >
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', mt: 3, mb:1, color: "text.secondary" }}>
        Strategy Settings
      </Typography>

      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleOpenStrategyModal} 
        sx={{ mb: 1, width: "100%" }}
      >
        Customize Initial Strategy
      </Button>

      <Button 
        variant="outlined" 
        color="warning" // Or another appropriate color
        onClick={handleResetStrategy} 
        sx={{ mb: 2, width: "100%" }}
      >
        Reset to Default Strategy
      </Button>

      <Button variant="contained" color="primary" onClick={handleSaveSettings} sx={{ width: "100%" }}>
        Save All Settings
      </Button>

      <StrategyCustomizationModal
        open={showStrategyModal}
        onClose={handleCloseStrategyModal}
        initialStrategy={currentStrategy} // Pass the state variable
        gameLabels={POSITION_LABELS}
        onSave={handleSaveStrategy}
      />
    </Box>
  );
};

export default SettingsTab;
