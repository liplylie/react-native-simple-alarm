/**
 * Edit Alarm Without Activation
 */

// libs
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "../constants";
import { getAlarmById } from "../getAlarms";
import { Alarm as AlarmType } from "../../../Types";

// doesn't call activateAlarm again
export const editAlarmWithoutActivateAlarm = async (alarm: AlarmType): Promise<AlarmType[]> => {
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
      const parsedStorage = JSON.parse(storage) as AlarmType[];
      const updatedStorage = parsedStorage.map((storageAlarm) => {
        if (storageAlarm.id === alarm.id) {
          return Object.assign({}, alarmFromStorage, alarm);
        } else {
          return storageAlarm;
        }
      });
      await AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

      return updatedStorage;
    } else {
      throw new Error("No alarms are set");
    }
  } else {
    throw new Error("No alarms are set");
  }
};
