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

export const setAlarm = ({
  id,
  date,
  snooze,
  message = "Alarm",
  userInfo = {},
  soundName = ""
}) => {
  if (Platform.OS === "android") {
    let repeatTime = 1000 * 60 * Number(snooze);
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
        snooze
      }
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
            snooze
          }
        });
      }
    }
  }
};

setAlarm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  date: PropTypes.string.isRequired,
  snooze: PropTypes.number,
  message: PropTypes.string,
  userInfo: PropTypes.object.isRequired,
  soundName: PropTypes.string
};

export default setAlarm;
