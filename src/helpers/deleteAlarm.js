// libs
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

// local
import { alarmStorage } from "./constants.js";
import { cancelAlarmWithoutEdit } from "./libraryOnlyHelpers/cancelAlarmWithoutEdit";

export const deleteAlarm = async (alarm) => {
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
    AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error("No alarms are set");
  }
};

deleteAlarm.propTypes = {
  alarm: PropTypes.object.isRequired,
};

export const deleteAlarmById = async (id) => {
  if (!id) {
    throw new Error("Please enter an alarm id");
  }
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      (storageAlarm) => storageAlarm.id !== id
    );

    // deactivates alarm notificaton if activated
    await cancelAlarmWithoutEdit(id);
    AsyncStorage.setItem(alarmStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error("No alarms are set");
  }
};

deleteAlarmById.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const deleteAllAlarms = async () => {
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    parsedStorage.forEach(({ oid }) => {
      cancelAlarmWithoutEdit(oid);
    });
    await AsyncStorage.setItem(alarmStorage, JSON.stringify([]));
    return [];
  } else {
    throw new Error("No alarms are set");
  }
};
