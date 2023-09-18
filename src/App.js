import React from "react";
import { useState, useEffect } from "react";
import mixpanel from 'mixpanel-browser';

mixpanel.init("0100b27f43a95845bdcf20b72074d820", {
  debug: true
});

export default function Board() {
  const clicked = () => {
    console.log("button Clicked");
    mixpanel.track("i love PUP-CPE department", {
      name: "maangas-na-name",
      class: "maangas-na-class",
      roll: 1
    });
  };

  return (
    <div className="daApp">
      <button onClick={clicked}>
        pindutan na maangas
      </button>
    </div>
  );
}
