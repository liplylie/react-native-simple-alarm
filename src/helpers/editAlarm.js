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
import { setAlarmWithoutEdit } from "./setAlarm";

export const editAlarm = async (alarm) => {
  if (!alarm) {
    console.error("There is not an alarm");
    return null;
  }
  // get all properties for alarm
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
      await AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

      if (alarm.active) {
        await setAlarmWithoutEdit(alarm.id);
      }

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

// doesn't call setalarm again
export const editAlarmWithoutSetAlarm = async (alarm) => {
  if (!alarm) {
    console.error("There is not an alarm");
    return null;
  }

  // get all properties for alarm
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

editAlarmWithoutSetAlarm.propTypes = {
  alarm: PropTypes.object.isRequired,
};
