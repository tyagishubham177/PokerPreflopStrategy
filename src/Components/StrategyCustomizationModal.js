import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StrategyEditor from './StrategyEditor.js';
import ErrorBoundary from './ErrorBoundary'; 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { initialPokerStrategy } from '../Constants/InitialStrategy.js';
import { SITUATION_LABELS, POSITION_LABELS } from '../Constants/GameLabels.js';

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
  initialStrategy: initialStrategyFromProp, // Renamed to avoid conflict with imported
  gameLabels, // Keep for now, might be removed later if not used
  onSave,
}) => {
  const [modifiedStrategies, setModifiedStrategies] = useState({});
  const [selectedSituation, setSelectedSituation] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDecision, setSelectedDecision] = useState('');

  useEffect(() => {
    if (open) {
      // Initialize modifiedStrategies with a deep copy of initialPokerStrategy
      setModifiedStrategies(JSON.parse(JSON.stringify(initialPokerStrategy)));
      
      // Set initial selections
      const situationKeys = Object.keys(initialPokerStrategy);
      if (situationKeys.length > 0) {
        const firstSituation = situationKeys[0];
        setSelectedSituation(firstSituation);

        const positionKeys = Object.keys(initialPokerStrategy[firstSituation]);
        if (positionKeys.length > 0) {
          const firstPosition = positionKeys[0];
          setSelectedPosition(firstPosition);

          const decisionKeys = Object.keys(initialPokerStrategy[firstSituation][firstPosition]);
          if (decisionKeys.length > 0) {
            setSelectedDecision(decisionKeys[0]);
          } else {
            setSelectedDecision('');
          }
        } else {
          setSelectedPosition('');
          setSelectedDecision('');
        }
      } else {
        setSelectedSituation('');
        setSelectedPosition('');
        setSelectedDecision('');
      }
    }
  }, [open]);

  // Update position and decision if situation changes
  useEffect(() => {
    if (selectedSituation && modifiedStrategies[selectedSituation]) {
      const positionKeys = Object.keys(modifiedStrategies[selectedSituation]);
      if (positionKeys.length > 0) {
        const firstPosition = positionKeys[0];
        setSelectedPosition(firstPosition);
        const decisionKeys = Object.keys(modifiedStrategies[selectedSituation][firstPosition]);
        if (decisionKeys.length > 0) {
          setSelectedDecision(decisionKeys[0]);
        } else {
          setSelectedDecision('');
        }
      } else {
        setSelectedPosition('');
        setSelectedDecision('');
      }
    }
  }, [selectedSituation, modifiedStrategies]);

  // Update decision if position changes
  useEffect(() => {
    if (selectedSituation && selectedPosition && modifiedStrategies[selectedSituation] && modifiedStrategies[selectedSituation][selectedPosition]) {
      const decisionKeys = Object.keys(modifiedStrategies[selectedSituation][selectedPosition]);
      if (decisionKeys.length > 0) {
        setSelectedDecision(decisionKeys[0]);
      } else {
        setSelectedDecision('');
      }
    }
  }, [selectedPosition, selectedSituation, modifiedStrategies]);


  const handleStrategySelectionChange = (newHandsForCurrentDecision) => {
    if (selectedSituation && selectedPosition && selectedDecision) {
      setModifiedStrategies(prevStrategies => {
        const updatedStrategies = JSON.parse(JSON.stringify(prevStrategies)); // Deep copy
        if (!updatedStrategies[selectedSituation]) {
          updatedStrategies[selectedSituation] = {};
        }
        if (!updatedStrategies[selectedSituation][selectedPosition]) {
          updatedStrategies[selectedSituation][selectedPosition] = {};
        }
        updatedStrategies[selectedSituation][selectedPosition][selectedDecision] = newHandsForCurrentDecision;
        return updatedStrategies;
      });
    }
  };

  const handleSave = () => {
    if (onSave) {
      // TODO: Ensure modifiedStrategies is in the correct format for onSave
      // For now, we assume it's the entire strategy object
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

  
  // Determine hands for the editor based on current selections
  const handsForEditor = (selectedSituation && selectedPosition && selectedDecision && modifiedStrategies[selectedSituation] && modifiedStrategies[selectedSituation][selectedPosition] && modifiedStrategies[selectedSituation][selectedPosition][selectedDecision])
    ? modifiedStrategies[selectedSituation][selectedPosition][selectedDecision]
    : [];

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="lg" fullWidth> {/* Increased maxWidth for more space */}
      <DialogTitle>Customize Initial Strategy</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
          {/* Situation Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="situation-select-label">Situation</InputLabel>
            <Select
              labelId="situation-select-label"
              id="situation-select"
              value={selectedSituation}
              label="Situation"
              onChange={(e) => setSelectedSituation(e.target.value)}
            >
              {Object.keys(initialPokerStrategy).map((sitKey) => (
                <MenuItem key={sitKey} value={sitKey}>
                  {SITUATION_LABELS[sitKey] || sitKey}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Position Dropdown */}
          {selectedSituation && initialPokerStrategy[selectedSituation] && (
            <FormControl fullWidth>
              <InputLabel id="position-select-label">Position</InputLabel>
              <Select
                labelId="position-select-label"
                id="position-select"
                value={selectedPosition}
                label="Position"
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                {Object.keys(initialPokerStrategy[selectedSituation]).map((posKey) => (
                  <MenuItem key={posKey} value={posKey}>
                    { (POSITION_LABELS[posKey] && `${POSITION_LABELS[posKey].hero} vs ${POSITION_LABELS[posKey].villain}`) || posKey }
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Decision Dropdown */}
          {selectedSituation && selectedPosition && initialPokerStrategy[selectedSituation]?.[selectedPosition] && (
            <FormControl fullWidth>
              <InputLabel id="decision-select-label">Decision</InputLabel>
              <Select
                labelId="decision-select-label"
                id="decision-select"
                value={selectedDecision}
                label="Decision"
                onChange={(e) => setSelectedDecision(e.target.value)}
              >
                {Object.keys(initialPokerStrategy[selectedSituation][selectedPosition]).map((decKey) => (
                  <MenuItem key={decKey} value={decKey}>
                    {decKey}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        {selectedSituation && selectedPosition && selectedDecision && (
          <ErrorBoundary fallbackMessage={`Error loading strategy editor for ${selectedSituation} > ${selectedPosition} > ${selectedDecision}. Please try selecting other options or reopening the dialog.`}>
            <StrategyEditor
              key={`${selectedSituation}-${selectedPosition}-${selectedDecision}`} // Ensure re-render on change
              initialHands={handsForEditor}
              onSelectionChange={handleStrategySelectionChange}
            />
          </ErrorBoundary>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StrategyCustomizationModal;
