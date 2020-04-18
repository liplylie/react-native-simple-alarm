/**
 * Set Alarm
 * Creates push notifications for alarm
 * @id {string}
 * @date {string} ISO format
 * @oid {string} needed for iOS. oid = Original ID.
 * @snooze {int} minutes
 * @message {string} Alarm message
 */

// libs
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants.js";
import { getAlarmById } from "./getAlarms";

export const editAlarm = async (alarm) => {
  if (!alarm) {
    console.error("There is not an alarm");
    return null;
  }

  const alarmFromStorage = await getAlarmById(alarm.id);

    if (!alarmFromStorage) {
      console.error("This alarm does not exist. Please create a new one.");
      return null;
    }

  if (alarm) {
    const storage = await AsyncStorage.getItem(alarmStorage);

    if (storage && storage.length > 0) {
      const parsedStorage = JSON.parse(storage);
      const updatedStorage = parsedStorage.map((storageAlarm) => {
        if (storageAlarm.id === alarm.id) {
          return Object.assign({}, alarmFromStorage, alarm);
        } else {
          return storageAlarm;
        }
      });
      AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

      return updatedStorage;
    } else {
      console.error("No alarms are set");
      return null;
    }
  } else {
    console.error("No alarms are set");
    return null;
  }
};

editAlarm.propTypes = {
  alarm: PropTypes.object.isRequired,
};
