/**
 * Cancel Alarm
 * @id {string} int for android
 * @oid {string} needed for iOS
 * @notification {object}
 * @userInfo {object}
 */
import PropTypes from "prop-types";
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

// local
import { getAlarmById } from "./getAlarms";
import { editAlarm } from "./editAlarm";

export const cancelAlarm = (alarm) => {
  if (!alarm) {
    console.error("Please enter an alarm");
    return null;
  }
  const { id } = alarm;

  if (Platform.OS === "ios") {
    // this logic is needed because of how ios alarms are set
    PushNotificationIOS.getScheduledLocalNotifications((notification) => {
      notification.forEach(({ userInfo }) => {
        if (userInfo.id === id || userInfo.oid === id) {
          PushNotification.cancelLocalNotifications({ id: userInfo.id });
        }
      });
    });
  } else {
    PushNotification.cancelLocalNotifications({ id: JSON.stringify(id) });
  }
};

cancelAlarm.propTypes = {
  alarm: PropTypes.object.isRequired,
};

export const cancelAlarmById = async (id) => {
  if (!id) {
    console.error("Please enter an alarm id");
    return null;
  }

  const alarm = await getAlarmById(id);
   if (!alarm) {
     console.error("There is not an alarm with this id");
     return null;
   }

  await editAlarm(Object.assign({}, alarm, { active: false }));

  if (Platform.OS === "ios") {
    // this logic is needed because of how ios alarms are set
    PushNotificationIOS.getScheduledLocalNotifications((notification) => {
      notification.forEach(({ userInfo }) => {
        if (userInfo.id === id || userInfo.oid === id) {
          PushNotification.cancelLocalNotifications({ id: userInfo.id });
        }
      });
    });
  } else {
    PushNotification.cancelLocalNotifications({ id: JSON.stringify(id) });
  }
};

cancelAlarmById.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};


export const cancelAlarmByIdFromDelete = async (id) => {
  if (!id) {
    console.error("Please enter an alarm id");
    return null;
  }

  if (Platform.OS === "ios") {
    // this logic is needed because of how ios alarms are set
    PushNotificationIOS.getScheduledLocalNotifications((notification) => {
      notification.forEach(({ userInfo }) => {
        if (userInfo.id === id || userInfo.oid === id) {
          PushNotification.cancelLocalNotifications({ id: userInfo.id });
        }
      });
    });
  } else {
    PushNotification.cancelLocalNotifications({ id: JSON.stringify(id) });
  }
};

cancelAlarmByIdFromDelete.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
