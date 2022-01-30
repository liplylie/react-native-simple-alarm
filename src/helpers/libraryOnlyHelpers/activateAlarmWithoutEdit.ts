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
import { Platform } from "react-native";
import PushNotification, {
  PushNotificationScheduleObject,
} from "react-native-push-notification";


// local
import { getAlarmById } from "../getAlarms";
import { editAlarmWithoutActivateAlarm } from "./editAlarmWithoutActivateAlarm";
import { ID } from "../../Types";

// doesn't call edit alarm again
// should only be used within the library
export const activateAlarmWithoutEdit = async (id: ID): Promise<void> => {
  if (!id) {
    throw new Error("Please enter an id");
  }

  const alarm = await getAlarmById(id);

  if (!alarm) {
    throw new Error("There is not an alarm with this id");
  }
  let date = alarm.date;
  const now = Date.now();

  // bug with react-native-push-notification where alarm fires if it is before the current time.
  // https://github.com/zo0r/react-native-push-notification/issues/1336
  if (now > new Date(date).getTime()) {
    const addDayToDate = new Date(now + 3600 * 1000 * 24).toISOString();

    await editAlarmWithoutActivateAlarm(
      Object.assign({}, alarm, {
        date: addDayToDate,
        active: true,
      })
    );

    date = addDayToDate;
  }

  const { snooze } = alarm;

  if (Platform.OS === "android") {
    // repeats every x minutes
    const repeatTime = 1000 * 60 * Number(snooze);

    // allows other properties from react-native push notification to be included in the alarm
    const androidAlarm: PushNotificationScheduleObject = Object.assign(
      {},
      alarm,
      {
        date: new Date(date),
        id: JSON.stringify(id),
        notificationId: id,
        repeatType: "time",
        repeatTime: repeatTime,
        userInfo: {
          ...alarm.userInfo,
          id: JSON.stringify(id),
          oid: JSON.stringify(id),
          snooze,
        },
      }
    );

    PushNotification.localNotificationSchedule(androidAlarm);
  } else {
    // repeatTime needs to be in milliseconds
    const repeatTime = snooze * 1000;
    const iosAlarm = Object.assign({}, alarm, {
      date: new Date(date),
      repeatType: "minute",
      repeatTime: repeatTime,
      userInfo: {
        ...alarm.userInfo,
        oid: id,
        id,
        snooze,
      },
    });

    PushNotification.localNotificationSchedule(iosAlarm);
    // todo: add multiple alarms for ios
    // ios push notifications only last for 5 seconds.
    // This sets multiple push notifications for ios.
    // for (let j = 0; j < 10; j++) {
    //   let initialAlarm = moment(date).add(Number(snooze) * j, "minutes");

    //   for (let i = 0; i < 4; i++) {
    //     let tempDate = moment(initialAlarm).add(i * 8, "seconds");

    //     PushNotification.localNotificationSchedule({
    //       message: message,
    //       soundName,
    //       date: new Date(tempDate),
    //       userInfo: {
    //         ...userInfo,
    //         id: id + String(j) + String(i),
    //         oid: id,
    //         snooze,
    //       },
    //     });
    //   }
    // }
  }
};
