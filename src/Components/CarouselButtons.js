import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const arrowStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: "gray",
  zIndex: 1,
};

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...arrowStyles, marginRight: "20px" }} // Adjust the margin as needed
      onClick={onClick}
    >
      <ChevronRightIcon style={{ fontSize: "2rem" }} />
    </div>
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, ...arrowStyles }}
      onClick={onClick}
    >
      <ChevronLeftIcon style={{ fontSize: "2rem" }} />
    </div>
  );
};
