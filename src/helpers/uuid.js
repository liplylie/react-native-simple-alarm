// libs
import { Platform } from "react-native";

export const uuid = () => {
  if (Platform.OS === "ios") {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  } else {
    return Math.floor(Math.random() * 100000) + 1;
  }
};

export default uuid;
