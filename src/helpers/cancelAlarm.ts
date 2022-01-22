/**
 * Cancel Alarm
 * Cancels push notfication for alarm
 * @id {string || number} 
 */

//@ts-ignore
import PushNotification from "react-native-push-notification";
import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

// local
import { getAlarmById } from "./getAlarms";
import { editAlarm } from "./editAlarm";
import { Alarm as AlarmType } from "../../Types";

export const cancelAlarm = (alarm: AlarmType): void => {
  if (!alarm) {
    throw new Error("Please enter an alarm");
  }
  const { id } = alarm;

  if (Platform.OS === "ios") {
    // this logic is needed because of how ios alarms are set
    PushNotificationIOS.getPendingNotificationRequests((notification) => {
      notification.forEach(({ userInfo }) => {
        if (userInfo.id === id || userInfo.oid === id) {
          PushNotification.cancelLocalNotification({ id: userInfo.id });
        }
      });
    });
  } else {
    PushNotification.cancelLocalNotification({ id: JSON.stringify(id) });
  }
};

export const cancelAlarmById = async (id: string | number): Promise<AlarmType> => {
  if (!id) {
    throw new Error("Please enter an alarm id");
  }

  const alarm = await getAlarmById(id);
   if (!alarm) {
     throw new Error("There is not an alarm with this id");
   }

  const updatedAlarm = await editAlarm(Object.assign({}, alarm, { active: false }));

  if (Platform.OS === "ios") {
    // this logic is needed because of how ios alarms are set
    PushNotificationIOS.getPendingNotificationRequests((notification) => {
      notification.forEach(({ userInfo }) => {
        if (userInfo.id === id || userInfo.oid === id || userInfo.oid === alarm.oid) {
          PushNotification.cancelLocalNotification({ id: userInfo.id });
        }
      });
    });
  } else {
    PushNotification.cancelLocalNotification({ id: JSON.stringify(id) });
  }

  return updatedAlarm
};