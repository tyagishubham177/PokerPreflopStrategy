import React from 'react';
import { Info } from '@mui/icons-material';

export const positions = [
  { name: "UTG", description: "Under the Gun: First to act" },
  { name: "UTG+1", description: "Under the Gun +1: Second to act" },
  { name: "UTG+2", description: "Under the Gun +2: Third to act" },
  { name: "LJ", description: "Lojack: 2 seats right of the button" },
  { name: "HJ", description: "Hijack: 1 seat right of the button" },
  { name: "CO", description: "Cutoff: Directly right of the button" },
  { name: "BTN", description: "Button: Dealer position" },
  { name: "SB", description: "Small Blind: Left of the button" },
  { name: "BB", description: "Big Blind: Left of the small blind" },
];

export const suits = ["♠", "♥", "♦", "♣"];
export const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

export const InfoIcon = () => (
  <Info
    fontSize="small"
    style={{ cursor: "pointer" }}
  />
);

export const DIFFICULTY_SETTINGS = {
  "easy": { lives: 5, hints: 3, timerDuration: 90 },
  "medium": { lives: 3, hints: 1, timerDuration: 60 },
  "hard": { lives: 3, hints: 0, timerDuration: 40 }
};
