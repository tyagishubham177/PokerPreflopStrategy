const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

/**
 * Generates the standard string representation for a poker hand.
 * Examples: "AKs" (suited King, Ace), "77" (pocket pair of 7s), "QJo" (offsuit Queen, Jack).
 * Ranks are ordered from Highest (A) to Lowest (2).
 * @param {string} rank1 - The first rank of the hand (e.g., 'A', 'K').
 * @param {string} rank2 - The second rank of the hand (e.g., 'Q', '7').
 * @returns {string} The string representation of the hand.
 */
export const getHandRepresentation = (rank1, rank2) => {
  const index1 = ranks.indexOf(rank1);
  const index2 = ranks.indexOf(rank2);

  if (index1 === -1 || index2 === -1) {
    console.error("Invalid rank provided to getHandRepresentation:", rank1, rank2);
    return ""; // Or throw an error
  }

  // Determine the higher and lower rank based on their index in the `ranks` array
  // A smaller index means a higher rank (A=0, K=1, ...)
  const r1 = ranks[Math.min(index1, index2)]; // Higher rank (smaller index)
  const r2 = ranks[Math.max(index1, index2)]; // Lower rank (larger index)

  if (index1 === index2) {
    return r1 + r2; // Pocket pair, e.g., AA, KK
  } else if (index1 < index2) {
    // This condition was for determining suited vs offsuit based on original order.
    // For representation, we always want HigherRank + LowerRank + type.
    // The "type" of hand (suited 's' or offsuit 'o') depends on how the grid is constructed.
    // In a standard poker hand grid:
    // - Diagonal: pairs (r1r1)
    // - Upper-right triangle (index1 < index2): suited hands (r1r2s)
    // - Lower-left triangle (index1 > index2): offsuit hands (r1r2o)
    // The parameters rank1 and rank2 come from iterating through the ranks for rows and columns.
    // rank1 is the row rank, rank2 is the column rank.
    return r1 + r2 + 's'; // Suited, e.g. AKs
  } else {
    // index1 > index2 implies it's from the lower-left triangle (offsuit)
    return r1 + r2 + 'o'; // Offsuit, e.g. AKo (if rank1 was K, rank2 was A, this makes AKo)
  }
};

export const handMatrixRanks = [...ranks];
