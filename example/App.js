// libs
import React, {Component} from 'react';
import {Platform, AppState, Alert} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {ActionConst, Router, Scene} from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';
import {cancelAlarmById} from 'react-native-simple-alarm';
import {Actions} from 'react-native-router-flux';

// Components
import Home from './src/Home/Home';
import AddAlarms from './src/Home/AddAlarms';

export default class App extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function (notification) {
        const {message, data} = notification;

        if (notification) {
          Alert.alert(message, '', [
            {
              text: 'OK',
              onPress: async () => {
                await cancelAlarmById(data.id);
                Actions.Home()
              },
            },
          ]);
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: Platform.OS === 'android',
      requestPermissions: true,
    });

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = async (appState) => {
    if (appState === 'active') {
    }

    if (appState === 'background' || appState === 'inactive') {
    }
  };

  render() {
    return (
      <Router>
        <Scene key={'ROOT_SCENE'} panHandlers={null} passProps>
          <Scene
            key={'Home'}
            component={Home}
            hideNavBar
            type={ActionConst.RESET}
          />

          <Scene
            key={'AddAlarms'}
            component={AddAlarms}
            hideNavBar
            type={ActionConst.RESET}
          />

          <Scene
            key={'EditAlarm'}
            component={AddAlarms}
            hideNavBar
            type={ActionConst.RESET}
          />
        </Scene>
      </Router>
    );
  }
}
