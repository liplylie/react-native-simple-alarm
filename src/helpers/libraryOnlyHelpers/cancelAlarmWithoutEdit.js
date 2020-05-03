/**
 * Cancel Alarm
 * Cancels push notfication for alarm
 * @id {string || number} 
 */

import PropTypes from "prop-types";
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

// doesn't call edit alarm
export const cancelAlarmWithoutEdit = async (id) => {
  if (!id) {
    throw new Error("Please enter an alarm id");
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

cancelAlarmWithoutEdit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
