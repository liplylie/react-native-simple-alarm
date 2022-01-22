/**
 * Edit Alarm
 */

// libs
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants";
import { getAlarmById } from "./getAlarms";
import { activateAlarmWithoutEdit } from "./libraryOnlyHelpers/activateAlarmWithoutEdit";
import { cancelAlarmWithoutEdit } from "./libraryOnlyHelpers/cancelAlarmWithoutEdit";
import { Alarm as AlarmType } from "../../Types";

export const editAlarm = async (alarm: AlarmType): Promise<AlarmType> => {
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
      const parsedStorage = JSON.parse(storage) as AlarmType[];
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
        await activateAlarmWithoutEdit(alarm.id);
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
