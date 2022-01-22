// libs
import AsyncStorage from "@react-native-community/async-storage";

// local
import Alarm from "./Alarm";
import uuid from "./uuid";
import { activateAlarmWithoutEdit } from "./libraryOnlyHelpers/activateAlarmWithoutEdit";
import { alarmStorage } from "./constants";
import { Alarm as AlarmType } from "../Types";

export const createAlarm = async ({
  active = false,
  date = "",
  message = "Alarm",
  snooze = 0,
  userInfo = {},
  ...props
}: AlarmType) => {
  if (!date) {
    throw new Error("Please enter a date");
  }

  // oid is used to reference id's from ios push notification
  const id = uuid();
  const alarm = new Alarm({
    id,
    oid: id,
    active,
    date,
    message,
    snooze,
    userInfo,
    ...props
  });
  const storage = await AsyncStorage.getItem(alarmStorage);

  if (storage && storage.length > 0) {
    const updatedStorage = JSON.stringify([...JSON.parse(storage), alarm]);
    await AsyncStorage.setItem(alarmStorage, updatedStorage);
  } else {
    await AsyncStorage.setItem(alarmStorage, JSON.stringify([alarm]));
  }

  if (active) {
    await activateAlarmWithoutEdit(alarm.id);
  }

  return alarm;
};

export default createAlarm;
