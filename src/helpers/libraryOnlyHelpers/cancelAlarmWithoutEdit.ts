/**
 * Cancel Alarm
 * Cancels push notfication for alarm without activation
 * @id {string || number}
 */

import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import { ID } from "../../Types";

// doesn't call edit alarm
export const cancelAlarmWithoutEdit = async (id: ID) => {
  if (!id) {
    throw new Error("Please enter an alarm id");
  }

  if (Platform.OS === "ios") {
    // this logic is needed because of how ios alarms are set
    PushNotificationIOS.getPendingNotificationRequests((notification) => {
      notification.forEach(({ userInfo }) => {
        if (userInfo) {
          if (userInfo.id === id || userInfo.oid === id) {
            PushNotification.cancelLocalNotification(userInfo.id);
          }
        }
      });
    });
  } else {
    PushNotification.cancelLocalNotification(JSON.stringify(id));
  }
};
