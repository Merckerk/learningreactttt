import React from "react";
import { useState, useEffect } from "react";

export default function Board() {
  const clicked = () => {
    console.log("button Clicked");
  };

  return (
    <div className="daApp">
      <button onClick={clicked}>
        pindutan na maangas
      </button>
    </div>
  );
}
