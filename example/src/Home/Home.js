import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Actions} from 'react-native-router-flux';

// Components
import NavBar from '../Common/NavBar';
import AlarmList from './AlarmList';

const Home = () => {
  const handleAddAlarm = () => {
    Actions.AddAlarms();
  };

  return (
    <View style={{display: 'flex', flex: 1}}>
      <NavBar
        title="Alarms"
        rightButtonIcon="plus"
        onRightButtonPress={handleAddAlarm}
      />

      <SafeAreaView style={{display: 'flex', flex: 1}}>
        <AlarmList />
      </SafeAreaView>
    </View>
  );
};

export default Home;
