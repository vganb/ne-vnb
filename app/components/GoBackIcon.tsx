import React from "react";

const GoBackIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="43"
        height="43"
        fill="none"
        viewBox="0 0 43 43"
      >
        <path fill="#fff" d="M0 0h43v43H0z" />
        <path
          fill="#000" /* Ensuring the arrow is black */
          d="M15 19l-7-7 7-7M8 12h24"
        />
      </svg>
    </div>
  );
};

export default GoBackIcon;
