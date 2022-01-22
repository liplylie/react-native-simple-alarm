// libs
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants";
import { cancelAlarmWithoutEdit } from "./libraryOnlyHelpers/cancelAlarmWithoutEdit";
import { Alarm as AlarmType } from "../Types";

export const deleteAlarm = async (alarm: AlarmType): Promise<AlarmType[]> => {
  if (!alarm) {
    throw new Error("Please enter an alarm");
  }
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      (storageAlarm) => storageAlarm.oid !== alarm.oid
    );
    cancelAlarmWithoutEdit(alarm.oid);
    await AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error("No alarms are set");
  }
};

export const deleteAlarmById = async (id: string | number): Promise<AlarmType[]> => {
  if (!id) { 
    throw new Error("Please enter an alarm id");
  }
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage) as AlarmType[];
    const updatedStorage = parsedStorage.filter(
      (storageAlarm) => storageAlarm.id !== id
    );

    // deactivates alarm notificaton if activated
    await cancelAlarmWithoutEdit(id);
    await AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error("No alarms are set");
  }
};

export const deleteAllAlarms = async (): Promise<[]> => {
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage) as AlarmType[];
    parsedStorage.forEach(({ oid }) => {
      cancelAlarmWithoutEdit(oid);
    });
    await AsyncStorage.setItem(alarmStorage, JSON.stringify([]));
    return [];
  } else {
    throw new Error("No alarms are set");
  }
};
