import React, { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import CardDisplay from "./CardDisplay";

const HandDealer = ({ hand = [] }) => {
  const handKey = useMemo(() => hand.join(","), [hand]);

  return (
    <AnimatePresence mode="wait">
      <CardDisplay key={handKey} hand={hand} />
    </AnimatePresence>
  );
};

export default HandDealer;
