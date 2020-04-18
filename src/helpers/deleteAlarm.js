// libs
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants.js";
import { cancelAlarmByIdFromDelete } from "./cancelAlarm";

export const deleteAlarm = async (alarm) => {
  if (!alarm) {
    console.error("Please enter an alarm");
    return null;
  }
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      (storageAlarm) => storageAlarm.oid !== alarm.oid
    );
    cancelAlarmByIdFromDelete(alarm.oid);
    AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    console.error("No alarms are set");
    return null;
  }
};

deleteAlarm.propTypes = {
  alarm: PropTypes.object.isRequired,
};

export const deleteAlarmById = async (id) => {
  if (!id) {
    console.error("Please enter an alarm id");
    return null;
  }
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      (storageAlarm) => storageAlarm.id !== id
    );

    // deactivates alarm notificaton if activated
    await cancelAlarmByIdFromDelete(id);
    AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    console.error("No alarms are set");
    return null;
  }
};

deleteAlarmById.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const deleteAllAlarms = async () => {
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    storage.forEach(({ oid }) => {
      cancelAlarmById(oid);
    });
    await AsyncStorage.clear();
    return [];
  } else {
    console.error("No alarms are set");
    return null;
  }
};
