// libs
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants.js";

export const getAlarms = () => {
  const storage = AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    return storage;
  } else {
    return [];
  }
};

export const getAlarmById = (id) => {
  if (!id) {
    console.error("Please enter an id");
    return null;
  }

  const storage = AsyncStorage.getItem(alarmStorage);

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

export default getAlarms;
