# react-native-simple-alarm
Alarm clock functionality for react native ios and android built using [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) and [react-native-community/async-storage](https://github.com/react-native-community/async-storage).

[![ReactNativeChatImageAudio](https://img.youtube.com/vi/J9FWbwjAnMo/0.jpg)](https://www.youtube.com/watch?v=J9FWbwjAnMo"ReactNativeChatImageAudio")

## Installing (React Native >= 0.60.0)

Under the hood this library is using react-native-push-notification, @react-native-community/async-storage, and @react-native-community/push-notification-ios. These libraries will need to be installed as well.

`npm install --save react-native-simple-alarm @react-native-community/async-storage @react-native-community/push-notification-ios react-native-push-notification`

or

`yarn add react-native-simple-alarm @react-native-community/async-storage @react-native-community/push-notification-ios react-native-push-notification`

For `iOS` using `cocoapods`, run:

```bash
$ cd ios/ && pod install
```

## Installing (React Native <= 0.59.x)

`npm install --save react-native-simple-alarm @react-native-community/async-storage @react-native-community/push-notification-ios react-native-push-notification`

or

`yarn add react-native-simple-alarm @react-native-community/async-storage @react-native-community/push-notification-ios react-native-push-notification`

Use `react-native link` to add the library to your project:

Please follow the installation for [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) as well.

## Example
```bash
$ cd example
$ yarn install
```
if ios: 
```bash
$ cd ios/ && pod install
$ yarn ios
```

if android: 
```bash
$ yarn android
```

You may come across these issues while running the example: 
https://github.com/oblador/react-native-vector-icons/issues/1074
https://github.com/oblador/react-native-vector-icons/issues/328

### createAlarm 

| Prop           | Description                                                                                                                                                                                                                                                                     | Default                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`date`**   | **Required:** - Date for alarm to get triggered. ISO Format. example: `1996-10-15T00:05:32.000Z` `[string]` | _None_                                                                                                              |
| **`active`**    | Set to true when a push notification is scheduled. Setting to true schedules an alarm notification `[boolean]`                                                                                                                                             | `false` |
| **`message`**     |Notification Message on Push Notification `[string]`                                                                                                                                                                                                             | `"Alarm"`                                                                                                              |
| **`snooze`** | Sets snooze time for alert. In minutes `[number]`                                                                                                                                          | `1`                                                                                                             |
| **`userInfo`** | Any data that is needed for the alarm. `[Object]`                                                                                                                                          | `{}`                                                                                                             |

Also includes the props from `react-native-push-notification` Local Notifications except for `repeatType`.

 ID is created by the react-native-simple-alarm. 
 ID is uuid for ios, and number for android. 
OID is a property created by react-native-simple-alarm that is used to cancel ios alarms/scheduled push notifications.
 
```jsx
import { createAlarm } from 'react-native-simple-alarm';
import moment from 'moment'

createAlarm = async () => {
  try {
    await createAlarm({
        active: false,
        date: new Date().toISOString();,
        message: 'message',
        snooze: 1,
      });
  } catch (e) {}
}
```

### getAlarms
Returns an array of all alarms.
```jsx
import { getAlarms } from 'react-native-simple-alarm';

getAlarms = async () => {
  try {
    const alarms = await getAlarms();
  } catch (e) {}
}
```

### getAlarmById
Returns alarm object given its id. If trying to get an id that does not exist, it will return null and throw an error.

```jsx
import { getAlarmById } from 'react-native-simple-alarm';

getAlarms = async () => {
  let id = '07699912-87d9-11ea-bc55-0242ac130003';
  
  try {
    const alarm = await getAlarmById(id);
  } catch (e) {}
}
```

### editAlarm
Given alarm object, edits the alarm. If alarm `active` prop is set to true, it will create a scheduled push notification for alarm based on the date. If alarm `active` prop is set to false, it will cancel scheduled push notifications for alarm. Returns edited alarm. If alarm id does not exist, it will return null and throw an error. 

```jsx
import { editAlarm } from 'react-native-simple-alarm';
import moment from 'moment';

editAlarm = async () => {
  let id = '07699912-87d9-11ea-bc55-0242ac130003';
  
  try {
    await editAlarm({
        id,
        date: moment().add(1, 'days')format();,
        snooze: 1,
        message: 'Message',
        active: true
      });
  } catch (e) {}
}
```

### activateAlarmById
Given alarm id, sets alarm active prop to true, and creates scheduled push notification for alarm based on the date. Use this instead of `editAlarm` if you simply want to set the alarm active prop to true. If trying to get an id that does not exist, it will return null and throw an error. 

```jsx
import { activateAlarmById } from 'react-native-simple-alarm';

activateAlarm = async () => {
  let id = '07699912-87d9-11ea-bc55-0242ac130003';
  
  try {
    await activateAlarmById(id);
  } catch (e) {}
}
```

### cancelAlarmById
Given alarm id, sets alarm active prop to false, and cancels scheduled push notification for alarm based on the date. Call this when you want to cancel the alarm, and keep the alarm as well. Sets active prop to false. If trying to get an id that does not exist, it will return null and throw an error. 

```jsx
import { cancelAlarmById } from 'react-native-simple-alarm';

cancelAlarmById = async () => {
  let id = '07699912-87d9-11ea-bc55-0242ac130003';
  
  try {
    await cancelAlarmById(id);
  } catch (e) {}
}
```

### deleteAlarmById
Given alarm id, deletes alarm and cancels the scheduled push notification. Returns array of alarms after deletion. If trying to get an id that does not exist, it will return null and throw an error. 

```jsx
import { deleteAlarmById } from 'react-native-simple-alarm';
deleteAlarmById = async () => {
  let id = '07699912-87d9-11ea-bc55-0242ac130003';
  
  try {
    await deleteAlarmById(id);
  } catch (e) {}
}
```

### deleteAllAlarms
Deletes all alarms and cancels all alarm scheduled push notifications. Returns array of alarms after deletion (which will be empty array).

```jsx
import { deleteAllAlarms } from 'react-native-simple-alarm';
deleteAllAlarms = async () => {
  try {
    await deleteAllAlarms();
  } catch (e) {}
}
```

Note to self:
- follow https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c for deployment
- add ./dist/index.d.ts file
