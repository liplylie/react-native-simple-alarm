/**
 * Edit Alarm
 */

// libs
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants.js";
import { getAlarmById } from "./getAlarms";
import { setAlarmWithoutEdit } from "./setAlarm";
import { cancelAlarmWithoutEdit } from './cancelAlarm';

export const editAlarm = async (alarm) => {
  if (!alarm) {
    throw new Error("There is not an alarm");
  }
  // get all properties for alarm
  const alarmFromStorage = await getAlarmById(alarm.id);

  if (!alarmFromStorage) {
    throw new Error("This alarm does not exist. Please create a new one.");
  }

  if (alarm) {
    const storage = await AsyncStorage.getItem(alarmStorage);

    if (storage && storage.length > 0) {
      let updatedAlarm;
      const parsedStorage = JSON.parse(storage);
      const updatedStorage = parsedStorage.map((storageAlarm) => {
        if (storageAlarm.id === alarm.id) {
          updatedAlarm = Object.assign({}, alarmFromStorage, alarm);
          return updatedAlarm;
        } else {
          return storageAlarm;
        }
      });
      await AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

      if (alarm.active === true) {
        await setAlarmWithoutEdit(alarm.id);
      }

      if (alarm.active === false) {
        await cancelAlarmWithoutEdit(alarm.id);
      }

      return updatedAlarm;
    } else {
      throw new Error("No alarms are set");
    }
  } else {
    throw new Error("No alarms are set");
  }
};

editAlarm.propTypes = {
  alarm: PropTypes.object.isRequired,
};

// doesn't call setalarm again
export const editAlarmWithoutSetAlarm = async (alarm) => {
  if (!alarm) {
    throw new Error("There is not an alarm");
  }

  // get all properties for alarm
  const alarmFromStorage = await getAlarmById(alarm.id);

  if (!alarmFromStorage) {
    throw new Error("This alarm does not exist. Please create a new one.");
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
      throw new Error("No alarms are set");
    }
  } else {
    throw new Error("No alarms are set");
  }
};

editAlarmWithoutSetAlarm.propTypes = {
  alarm: PropTypes.object.isRequired,
};
