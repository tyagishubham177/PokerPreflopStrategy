import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StrategyEditor from './StrategyEditor.js'; // Assuming StrategyEditor.js is in the same directory

const POSITIONS = [
  { key: "UTG", labelKey: "UTG", strategyPath: "RFI.UTG", uiLabel: "UTG" },
  { key: "MP", labelKey: "UTG+1", strategyPath: "RFI.UTG+1", uiLabel: "MP" },
  { key: "HJ", labelKey: "HJ", strategyPath: "RFI.HJ", uiLabel: "HJ" },
  { key: "CO", labelKey: "CO", strategyPath: "RFI.CO", uiLabel: "CO" },
  { key: "BTN", labelKey: "BTN", strategyPath: "RFI.BTN", uiLabel: "BTN" },
  { key: "SB", labelKey: "SB", strategyPath: "RFI.SB", uiLabel: "SB" },
];

const getNestedValue = (obj, path) => {
  if (!path) return undefined;
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result;
};

const initializeAllStrategies = (initialStrategy) => {
  const strategies = {};
  if (!initialStrategy || !initialStrategy.RFI) {
    console.warn("Initial strategy or RFI not found");
    POSITIONS.forEach(pos => strategies[pos.key] = []);
    return strategies;
  }

  POSITIONS.forEach(position => {
    if (position.key === "SB") {
      const raiseForValue = getNestedValue(initialStrategy, `${position.strategyPath}.Raise for Value`) || [];
      const raiseAsBluff = getNestedValue(initialStrategy, `${position.strategyPath}.Raise as bluff`) || [];
      strategies[position.key] = Array.from(new Set([...raiseForValue, ...raiseAsBluff]));
    } else {
      const raiseActions = getNestedValue(initialStrategy, `${position.strategyPath}.Raise`) || [];
      strategies[position.key] = Array.from(new Set([...raiseActions]));
    }
  });
  return strategies;
};

const StrategyCustomizationModal = ({
  open,
  onClose,
  initialStrategy,
  gameLabels,
  onSave,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [modifiedStrategies, setModifiedStrategies] = useState({});

  useEffect(() => {
    if (open && initialStrategy) {
      setModifiedStrategies(initializeAllStrategies(initialStrategy));
      setCurrentTab(0); // Reset to the first tab when modal opens or strategy changes
    }
  }, [open, initialStrategy]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleStrategySelectionChange = (newHandsForCurrentPosition) => {
    const currentPositionKey = POSITIONS[currentTab].key;
    setModifiedStrategies(prevStrategies => ({
      ...prevStrategies,
      [currentPositionKey]: newHandsForCurrentPosition,
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(modifiedStrategies);
    }
    if (onClose) {
      onClose();
    }
  };
  
  const handleCancel = () => {
    if (onClose) {
        onClose();
    }
  };

  const currentPosition = POSITIONS[currentTab];
  const handsForEditor = currentPosition && modifiedStrategies[currentPosition.key]
    ? modifiedStrategies[currentPosition.key]
    : [];

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>Customize Initial Strategy</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Poker Position Tabs"
          >
            {POSITIONS.map((position) => (
              <Tab
                key={position.key}
                label={gameLabels && gameLabels[position.labelKey] ? gameLabels[position.labelKey] : position.uiLabel}
                id={`tab-${position.key}`}
                aria-controls={`tabpanel-${position.key}`}
              />
            ))}
          </Tabs>
        </Box>

        {POSITIONS.map((position, index) => (
          <div
            role="tabpanel"
            hidden={currentTab !== index}
            id={`tabpanel-${position.key}`}
            aria-labelledby={`tab-${position.key}`}
            key={position.key}
            style={{ paddingTop: '20px' }} 
          >
            {currentTab === index && (
              <StrategyEditor
                key={position.key} // Ensure StrategyEditor re-mounts or updates correctly
                initialHands={handsForEditor}
                onSelectionChange={handleStrategySelectionChange}
              />
            )}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StrategyCustomizationModal;
