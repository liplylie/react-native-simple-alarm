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
import moment from "moment";
import PropTypes from "prop-types";

// local
import { editAlarm } from "./editAlarm";
import { getAlarmById } from "./getAlarms";

export const setAlarmById = async (id) => {
  if (!id) {
    console.error("Please enter an id");
    return null;
  }

  const alarm = await getAlarmById(id);
  if (!alarm) {
    console.error("There is not an alarm with this id");
    return null;
  }

  await editAlarm(Object.assign({}, alarm, { active: true }));

  const {
    date,
    snooze,
    message = "Alarm",
    userInfo = {},
    soundName = "",
  } = alarm;

  if (Platform.OS === "android") {
    const repeatTime = 1000 * 60 * Number(snooze);

    PushNotification.localNotificationSchedule({
      soundName,
      message,
      date: new Date(date),
      id: JSON.stringify(id),
      notificationId: JSON.stringify(id),
      repeatType: "time",
      repeatTime: repeatTime,
      userInfo: {
        ...userInfo,
        id: JSON.stringify(id),
        oid: JSON.stringify(id),
        snooze,
      },
    });
  } else {
    // ios push notifications only last for 5 seconds.
    // This sets multiple push notifications for ios.
    for (let j = 0; j < 10; j++) {
      let initialAlarm = moment(date).add(Number(snooze) * j, "minutes");

      for (let i = 0; i < 4; i++) {
        let tempDate = moment(initialAlarm).add(i * 8, "seconds");

        PushNotification.localNotificationSchedule({
          message: message,
          soundName,
          date: new Date(tempDate),
          userInfo: {
            ...userInfo,
            id: id + String(j) + String(i),
            oid: id,
            snooze,
          },
        });
      }
    }
  }
};

setAlarmById.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default setAlarmById;
