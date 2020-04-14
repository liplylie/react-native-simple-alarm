// libs
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants.js";

export const deleteAlarm = (alarm) => {
  if (!alarm) {
    console.error("Please enter an alarm");
    return null;
  }
  const storage = AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const updatedStorage = storage.filter(
      (storageAlarm) => storageAlarm.oid !== alarm.oid
    );
    AsyncStorage.setItem(alarmStorage, updatedStorage);

    return updatedStorage;
  } else {
    console.error("No alarms are set");
    return null;
  }
};

deleteAlarm.propTypes = {
  alarm: PropTypes.object.isRequired
};

export default deleteAlarm;
