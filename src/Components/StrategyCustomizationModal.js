import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StrategyEditor from './StrategyEditor.js';
import ErrorBoundary from './ErrorBoundary'; 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { initialPokerStrategy as fallbackInitialStrategy } from '../Constants/InitialStrategy.js'; 
import { SITUATION_LABELS, POSITION_LABELS } from '../Constants/GameLabels.js';

const StrategyCustomizationModal = ({
  open,
  onClose, // This is the actual function from props to close the modal
  initialStrategy: initialStrategyFromProp, 
  onSave,
}) => {
  const [modifiedStrategies, setModifiedStrategies] = useState({});
  const [originalStrategiesOnOpen, setOriginalStrategiesOnOpen] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [selectedSituation, setSelectedSituation] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDecision, setSelectedDecision] = useState('');

  useEffect(() => {
    if (open) {
      const strategyToEdit = initialStrategyFromProp && Object.keys(initialStrategyFromProp).length > 0 
                             ? initialStrategyFromProp 
                             : fallbackInitialStrategy; 

      const deepCopyInitial = JSON.parse(JSON.stringify(strategyToEdit));
      setModifiedStrategies(deepCopyInitial);
      setOriginalStrategiesOnOpen(deepCopyInitial);
      setHasChanges(false); 
      
      const situationKeys = Object.keys(deepCopyInitial);
      if (situationKeys.length > 0) {
        const firstSituation = situationKeys[0];
        setSelectedSituation(firstSituation);

        const positionKeys = Object.keys(deepCopyInitial[firstSituation] || {});
        if (positionKeys.length > 0) {
          const firstPosition = positionKeys[0];
          setSelectedPosition(firstPosition);

          const decisionKeys = Object.keys(deepCopyInitial[firstSituation]?.[firstPosition] || {});
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
  }, [open, initialStrategyFromProp]);

  useEffect(() => {
    if (originalStrategiesOnOpen && modifiedStrategies) { 
      if (JSON.stringify(modifiedStrategies) !== JSON.stringify(originalStrategiesOnOpen)) {
        setHasChanges(true);
      } else {
        setHasChanges(false);
      }
    } else if (!originalStrategiesOnOpen && modifiedStrategies && Object.keys(modifiedStrategies).length > 0) {
      setHasChanges(false); 
    }
  }, [modifiedStrategies, originalStrategiesOnOpen]);

  // Effect for when selectedSituation changes (e.g., user selection)
  // This should update position, which in turn will update decision via the next effect.
  useEffect(() => {
    // Guard against running with stale modifiedStrategies during initial load,
    // or if selectedSituation is not yet valid with current strategies.
    if (!modifiedStrategies || Object.keys(modifiedStrategies).length === 0 || !selectedSituation) {
      if (!selectedSituation) { // if situation is cleared externally or invalid
        setSelectedPosition('');
        setSelectedDecision('');
      }
      return;
    }

    const situationExists = modifiedStrategies[selectedSituation];
    if (situationExists) {
      const positionKeys = Object.keys(modifiedStrategies[selectedSituation]);
      if (positionKeys.length > 0) {
        const currentPositionIsValid = modifiedStrategies[selectedSituation][selectedPosition];
        if (!currentPositionIsValid) { // If current position is not valid for new situation
          setSelectedPosition(positionKeys[0]); // Set to first available, triggers next effect
        }
        // If current position IS valid, we don't change it, let user action or next effect handle decision
      } else {
        setSelectedPosition(''); // No positions for this situation
        setSelectedDecision(''); // Cascade to clear decision as well
      }
    } else {
      // selectedSituation is not a key in modifiedStrategies (e.g. strategy loaded, situation doesn't exist)
      setSelectedPosition('');
      setSelectedDecision('');
    }
  }, [selectedSituation, modifiedStrategies]); // Only depends on situation and strategies

  // Effect for when selectedPosition changes (e.g., user selection or due to situation change)
  // This should update decision.
  useEffect(() => {
    // If situation or position is missing, or if the path in strategy is invalid, clear decision and return.
    if (!selectedSituation || !selectedPosition || 
        !modifiedStrategies?.[selectedSituation]?.[selectedPosition]) {
      setSelectedDecision('');
      return;
    }
    
    // At this point, modifiedStrategies[selectedSituation][selectedPosition] is a valid object.
    const decisionKeys = Object.keys(modifiedStrategies[selectedSituation][selectedPosition]);
    if (decisionKeys.length > 0) {
      // Only update if the current decision is not valid for the new position/situation,
      // or if selectedDecision is currently empty.
      if (!selectedDecision || !modifiedStrategies[selectedSituation][selectedPosition][selectedDecision]) {
          setSelectedDecision(decisionKeys[0]);
      }
    } else {
      setSelectedDecision(''); // No decisions for this position
    }
  }, [selectedPosition, selectedSituation, modifiedStrategies]); // Depends on position, situation, and strategies


  const handleStrategySelectionChange = (newHandsForCurrentDecision) => {
    if (selectedSituation && selectedPosition && selectedDecision) {
      setModifiedStrategies(prevStrategies => {
        const updatedStrategies = JSON.parse(JSON.stringify(prevStrategies)); 
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

  const executeClose = () => {
    if (onClose) { // Call the onClose passed from props
        onClose();
    }
  };

  const handleCloseAttempt = (closeReason) => { // closeReason is for context, not strictly used in logic now
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to discard them?")) {
        executeClose();
      }
      // If user cancels window.confirm, do nothing (modal stays open)
    } else {
      executeClose(); // No changes, proceed to close
    }
  };

  const handleSave = () => {
    if (onSave && hasChanges) { 
      onSave(modifiedStrategies); 
    }
    // Save button should also close the modal, regardless of changes (as per typical modal behavior)
    // However, if save implies no more interaction, closing makes sense.
    // Let's assume save also means close, and if there are no changes, it just closes.
    executeClose(); // Close after attempting save or if no changes
  };
  
  const currentStrategyData = modifiedStrategies; // Remains for clarity if used elsewhere, but handsForEditor will use modifiedStrategies directly

  const handsForEditor = modifiedStrategies?.[selectedSituation]?.[selectedPosition]?.[selectedDecision] || [];

  if (!open) {
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          handleCloseAttempt(reason);
        }
        // Note: If onClose is called without a reason (e.g. programmatically), 
        // it won't trigger handleCloseAttempt here. This is usually fine.
        // If direct programmatic close without confirmation is needed, executeClose() can be called.
      }} 
      maxWidth="lg" 
      fullWidth
    >
      <DialogTitle>Customize Initial Strategy</DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="situation-select-label">Situation</InputLabel>
                <Select
                  labelId="situation-select-label"
                  id="situation-select"
                  value={selectedSituation}
                  label="Situation"
                  onChange={(e) => setSelectedSituation(e.target.value)}
                >
                  {Object.keys(currentStrategyData).map((sitKey) => (
                    <MenuItem key={sitKey} value={sitKey}>
                      {SITUATION_LABELS[sitKey] || sitKey}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedSituation && currentStrategyData[selectedSituation] && (
                <FormControl fullWidth>
                  <InputLabel id="position-select-label">Position</InputLabel>
                  <Select
                    labelId="position-select-label"
                    id="position-select"
                    value={selectedPosition}
                    label="Position"
                    onChange={(e) => setSelectedPosition(e.target.value)}
                  >
                    {Object.keys(currentStrategyData[selectedSituation]).map((posKey) => (
                      <MenuItem key={posKey} value={posKey}>
                        { (POSITION_LABELS[posKey] && `${POSITION_LABELS[posKey].hero} vs ${POSITION_LABELS[posKey].villain}`) || posKey }
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {selectedSituation && selectedPosition && currentStrategyData[selectedSituation]?.[selectedPosition] && (
                <FormControl fullWidth>
                  <InputLabel id="decision-select-label">Decision</InputLabel>
                  <Select
                    labelId="decision-select-label"
                    id="decision-select"
                    value={selectedDecision}
                    label="Decision"
                    onChange={(e) => setSelectedDecision(e.target.value)}
                  >
                    {Object.keys(currentStrategyData[selectedSituation][selectedPosition]).map((decKey) => (
                      <MenuItem key={decKey} value={decKey}>
                        {decKey}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {selectedSituation && selectedPosition && selectedDecision && (
              <ErrorBoundary fallbackMessage={`Error loading strategy editor for ${selectedSituation} > ${selectedPosition} > ${selectedDecision}. Please try selecting other options or reopening the dialog.`}>
                <StrategyEditor
                  key={`${selectedSituation}-${selectedPosition}-${selectedDecision}`} 
                  initialHands={handsForEditor}
                  onSelectionChange={handleStrategySelectionChange}
                />
              </ErrorBoundary>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseAttempt('cancelButton')}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!hasChanges}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StrategyCustomizationModal;
