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

export const cancelAlarm = (id) => {
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

export default cancelAlarm;
