import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

// Components
import NavBar from '../Common/NavBar';
import AlarmList from './AlarmList';

const Home = () => {
  const handleAddAlarm = () => {
    Actions.AddAlarms();
  };

  return (
    <View style={styles.container}>
      <NavBar
        title="Alarms"
        rightButtonIcon="plus"
        onRightButtonPress={handleAddAlarm}
      />

      <SafeAreaView style={styles.container}>
        <AlarmList />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default Home;
