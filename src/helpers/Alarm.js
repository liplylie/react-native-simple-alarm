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
    userInfo = {}
  }) {
    this.id = id;
    this.active = active;
    this.date = date;
    this.message = message;
    this.snooze = snooze;
    this.userInfo = userInfo;
  }
}

Alarm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.boolean,
  date: PropTypes.string.isRequired,
  message: PropTypes.string,
  snooze: PropTypes.number,
  userInfo: PropTypes.object
};

export default Alarm;
