/**
 * Alarm
 * @id {string} int for push notification
 * @active {boolean}
 * @time {string} formatted hh:mm A
 * @date {string} ISO string
 * @message {string} Alarm message
 * @snooze {int}
 */

// libs
import { Platform } from "react-native";

import { Alarm as AlarmType } from "../../Types";

const emptyProperty = Platform.select({ ios: "", android: null });

export class Alarm {
  id: string | number;
  active: boolean;
  date: string;
  message: string;
  snooze: number;
  userInfo: {};
  oid?: string | number;
  ticker: any;
  autoCancel: boolean;
  largeIcon: any;
  smallIcon: any;
  bigText: any;
  subText: any;
  color: string;
  vibrate: boolean;
  vibration: number;
  tag: any;
  group: any;
  ongoing: boolean;
  priority: string;
  visibility: string;
  importance: string;
  allowWhileIdle: boolean;
  ignoreInForeground: boolean;
  alertAction: string;
  title: any;
  playSound: boolean;
  soundName: any;
  number: any;
  actions: string[];
  constructor({
    id = "",
    active = false,
    date = "",
    message = "Alarm",
    snooze = 1,
    // every property below is from react-native push notification
    // https://github.com/zo0r/react-native-push-notification
    userInfo = {},
    ticker = emptyProperty,
    autoCancel = true,
    largeIcon = emptyProperty,
    smallIcon = emptyProperty,
    bigText = emptyProperty,
    subText = emptyProperty,
    color = "white",
    vibrate = true,
    vibration = 1000,
    tag = emptyProperty,
    group = emptyProperty,
    ongoing = false,
    priority = "high",
    visibility = "private",
    importance = "high",
    allowWhileIdle = false,
    ignoreInForeground = false,
    alertAction = "view",
    title = emptyProperty,
    playSound = true,
    soundName = emptyProperty,
    number = emptyProperty,
    actions,
    // repeat type is removed on purpose
    // changing repeat type would effect snooze logic
  }: AlarmType) {
    this.id = id;
    this.active = active;
    this.date = date;
    this.message = message;
    this.snooze = snooze;
    this.userInfo = userInfo;
    this.oid = id;
    this.ticker = ticker;
    this.autoCancel = autoCancel;
    this.largeIcon = largeIcon;
    this.smallIcon = smallIcon;
    this.bigText = bigText;
    this.subText = subText;
    this.color = color;
    this.vibrate = vibrate;
    this.vibration = vibration;
    this.tag = tag;
    this.group = group;
    this.ongoing = ongoing;
    this.priority = priority;
    this.visibility = visibility;
    this.importance = importance;
    this.allowWhileIdle = allowWhileIdle;
    this.ignoreInForeground = ignoreInForeground;
    this.alertAction = alertAction;
    this.title = title;
    this.playSound = playSound;
    this.soundName = soundName;
    this.number = number;
    this.actions = actions;
  }
}

export default Alarm;
