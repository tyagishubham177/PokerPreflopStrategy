import { ranks } from '../Constants/GameConstants';

export const getHandRepresentation = (rank1, rank2) => {
  const index1 = ranks.indexOf(rank1);
  const index2 = ranks.indexOf(rank2);

  if (index1 === -1 || index2 === -1) {
    console.error("Invalid rank provided to getHandRepresentation:", rank1, rank2);
    return "";
  }

  const r1 = ranks[Math.min(index1, index2)];
  const r2 = ranks[Math.max(index1, index2)];

  if (index1 === index2) {
    return r1 + r2;
  } else if (index1 < index2) {
    return r1 + r2 + 's';
  } else {
    return r1 + r2 + 'o';
  }
};

// Use a reversed copy of ranks for the hand matrix so that the
// chart displays high cards (Aces) first and lows last.
export const handMatrixRanks = [...ranks].reverse();
