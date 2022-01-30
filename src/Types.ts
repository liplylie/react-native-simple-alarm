import { PushNotificationObject } from "react-native-push-notification";

export type Alarm = PushNotificationObject & {
  active: boolean;
  date: string;
  message: string;
  snooze: number;
  oid?: string | number;
};

export type ID = string | number | undefined
