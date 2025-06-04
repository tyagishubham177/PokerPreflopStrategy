import { ranks } from '../Constants/GameConstants';

export const getHandRepresentation = (rank1, rank2) => {
  const index1 = ranks.indexOf(rank1);
  const index2 = ranks.indexOf(rank2);

  if (index1 === -1 || index2 === -1) {
    console.error("Invalid rank provided to getHandRepresentation:", rank1, rank2);
    return "";
  }

  const highRank = ranks[Math.max(index1, index2)];
  const lowRank = ranks[Math.min(index1, index2)];

  if (index1 === index2) {
    return highRank + highRank;
  } else if (index1 > index2) {
    return highRank + lowRank + 'o';
  } else {
    return highRank + lowRank + 's';
  }
};

// Use a reversed copy of ranks for the hand matrix so that the
// chart displays high cards (Aces) first and lows last.
export const handMatrixRanks = [...ranks].reverse();
