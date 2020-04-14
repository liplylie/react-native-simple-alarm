"use strict";

import React from "react";
import { View } from "react-native";

const Arrow = props => {
  const { height, direction, color, style } = props;

  let width = (8.8 / 16.7) * height;
  let sideLength = Math.sqrt(width * width + (height / 2) * (height / 2));

  let angle;
  if (direction === "left") {
    angle = "-45deg";
  } else if (direction === "right") {
    angle = "135deg";
  }

  return (
    <View style={style}>
      <View
        style={[
          {
            width: sideLength,
            height: sideLength,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderColor: color,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            transform: [
              { rotate: angle },
              { translateY: 0 } 
            ]
          }
        ]}
      />
    </View>
  );
};

export { Arrow };
export default Arrow;
