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
import PropTypes from "prop-types";

export class Alarm {
  constructor({
    id = "",
    active = false,
    date = "",
    message = "Alarm",
    snooze = 1,
    // every property below is from react-native push notification
    // https://github.com/zo0r/react-native-push-notification
    userInfo = {},
    ticker = "",
    autoCancel = true,
    largeIcon = "",
    smallIcon = "",
    bigText = "",
    subText = "",
    color = "",
    vibrate = true,
    vibration = 1000,
    tag = "",
    group = "",
    ongoing = false,
    priority = "high",
    visibility = "private",
    importance = "high",
    allowWhileIdle = false,
    ignoreInForeground = false,
    alertAction = "view",
    title = "",
    playSound = true,
    soundName = "default",
    number = "",
    actions = '["Yes", "No"]'
    // repeat type is removed on purpose
    // changing repeat type would effect snooze logic
  }) {
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
    this.bigText = bigText,
    this.subText = subText,
    this.color = color
    this.vibrate = vibrate,
    this.vibration = vibration,
    this.tag = tag
    this.group = group
    this.ongoing = ongoing,
    this.priority = priority,
    this.visibility = visibility,
    this.importance = importance,
    this.allowWhileIdle = allowWhileIdle,
    this.ignoreInForeground = ignoreInForeground,
    this.alertAction = alertAction,
    this.title = title,
    this.playSound = playSound,
    this.soundName = soundName,
    this.number = number,
    this.actions = actions
  }
}

Alarm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.boolean,
  date: PropTypes.string.isRequired,
  message: PropTypes.string,
  snooze: PropTypes.number,
  userInfo: PropTypes.object
};

export default Alarm;
