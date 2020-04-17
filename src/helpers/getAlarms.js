// libs
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants.js";

export const getAlarms = async () => {
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    return  JSON.parse(storage);
  } else {
    return [];
  }
};

export const getAlarmById = async (id) => {
  if (!id) {
    console.error("Please enter an id");
    return null;
  }

  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const alarm = storage.find((storageAlarm) => storageAlarm.oid === id);
    if (alarm) {
      return alarm;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
