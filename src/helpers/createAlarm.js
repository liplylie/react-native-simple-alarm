// libs
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

// local
import Alarm from "./Alarm.js";
import uuid from "./uuid.js";
import { alarmStorage } from "./constants.js";

export const createAlarm = ({
  active = false,
  date = "",
  message = "Alarm",
  snooze = 0,
  userInfo = {}
}) => {
  if (!date) {
    console.error("Please enter a date");
    return null;
  }

  // oid is used to reference id's from ios push notification
  const id = uuid();
  const alarm = new Alarm({
    id,
    oid: id,
    active,
    date,
    message,
    snooze,
    userInfo
  });
  const storage = AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const updatedStorage = [...storage, alarm];
    AsyncStorage.setItem(alarmStorage, updatedStorage);
  } else {
    AsyncStorage.setItem(alarmStorage, [alarm]);
  }

  return alarm;
};

createAlarm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.boolean,
  date: PropTypes.string.isRequired,
  message: PropTypes.string,
  snooze: PropTypes.number,
  userInfo: PropTypes.object
};

export default createAlarm;
