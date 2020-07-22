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
import PushNotification from "react-native-push-notification";
import PropTypes from "prop-types";
import moment from "moment";

// local
import { getAlarmById } from "../getAlarms";
import { editAlarmWithoutActivateAlarm } from "../libraryOnlyHelpers/editAlarmWithoutActivateAlarm";

// doesn't call edit alarm again
// should only be used within the library
export const activateAlarmWithoutEdit = async (id) => {
  if (!id) {
    throw new Error("Please enter an id");
  }

  const alarm = await getAlarmById(id);

  if (!alarm) {
    throw new Error("There is not an alarm with this id");
  }
  let date = alarm.date;

  // bug with react-native-push-notification where alarm fires if it is before the current time.
  // https://github.com/zo0r/react-native-push-notification/issues/1336
  if (moment().isAfter(date)) {
    const addDayToDate = moment(date).add(1, "days").format();

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
    const androidAlarm = Object.assign({}, alarm, {
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
    });

    PushNotification.localNotificationSchedule(androidAlarm);
  } else {
    const iosAlarm = Object.assign({}, alarm, {
      date: new Date(date),
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

activateAlarmWithoutEdit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
