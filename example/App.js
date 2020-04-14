// libs
import React, {Component} from 'react';
import {Platform, AppState} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {ActionConst, Actions, Router, Scene} from 'react-native-router-flux';
import PushNotification from 'react-native-push-notification';

// Components
import Home from './src/Home/Home';
import AddAlarms from './src/Home/AddAlarms';

export default class App extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function (notification) {
        let currentScene = Actions.currentScene;
        console.log(currentScene, 'currentScene');
        let {userInteraction, foreground, data, userInfo} = notification;
        const clicked = userInteraction;

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
