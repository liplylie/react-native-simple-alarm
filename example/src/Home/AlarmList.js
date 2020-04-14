// libs
import React, {Component} from 'react';
import {
  Alert,
  Text,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Actions} from 'react-native-router-flux';
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment';
import {cancelAlarm, setAlarm, deleteAlarm} from 'react-native-simple-alarm';

// Global
import {Colors, Convert} from '../styles';

const {height, width} = Dimensions.get('window');

class AlarmList extends Component {
  confirmDeletePress = (data, rowRef) => {
    Alert.alert('Are you sure?', 'Your alarm will be deleted', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => this.handleDeletePress(data, rowRef),
      },
    ]);
  };

  handleAlarmActivation = (value, alarm) => {
    if (value === 0) {
      cancelAlarm(Platform.OS, alarm.id);
    } else if (value === 1) {
      if (!moment(alarm.date).isAfter(moment.now())) {
        let diff = moment().diff(moment(alarm.date), 'days');
        alarm.date = moment(alarm.date)
          .add(diff + 1, 'days')
          .format();
      }
      setAlarm({
        id: alarm.id,
        date: alarm.date,
        snooze: alarm.snooze,
        message: alarm.message,
      });
    }
  };

  renderAlarms = (data) => {
    let radio_props = [
      {label: 'On', value: 1},
      {label: 'Off', value: 0},
    ];
    let alarmColor = ['rgba(240, 240, 240, 0.9)', 'rgba(200, 200, 200, 1)'];
    let alarmReverse = ['rgba(200, 200, 200, 1)', 'rgba(240, 240, 240, 0.9)'];
    if (!data) {
      return null;
    }
    return (
      <LinearGradient
        style={styles.alarmContainer}
        start={{x: 0.0, y: 0.25}}
        end={{x: 1, y: 1.0}}
        colors={data.active ? alarmColor : alarmReverse}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <View style={styles.alarm}>
            <TouchableOpacity onPress={() => Actions.EditAlarm({edit: data})}>
              <Text style={{fontSize: Convert(40), paddingLeft: Convert(10)}}>
                {data.time}
              </Text>
            </TouchableOpacity>
            <RadioForm
              radio_props={radio_props}
              labelColor={'gray'}
              onPress={(value) => this.handleAlarmActivation(value, data)}
              formHorizontal={true}
              animation={true}
              initial={data.active ? 0 : 1}
              radioStyle={{paddingRight: Convert(13)}}
              style={{marginLeft: Convert(60)}}
            />
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{data.message}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  handleDeletePress = (data, rowRef) => {
    cancelAlarm(data.id);
    deleteAlarm(data.id);
    rowRef.manuallySwipeRow(0);
  };

  render() {
    const {alarms = []} = this.props;
    const dataSource = alarms;

    return (
      <SwipeListView
        style={{
          width: width,
          height: height,
          backgroundColor: Colors.lightGray,
        }}
        dataSource={dataSource}
        renderRow={this.renderAlarms}
        renderHiddenRow={(data, secId, rowId, rowMap) => (
          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: Convert(10),
              marginTop: Convert(5),
              padding: Convert(11),
              backgroundColor: 'red',
            }}>
            <TouchableOpacity
              onPress={() =>
                this.confirmDeletePress(data, rowMap[`${secId}${rowId}`])
              }>
              <Image
                style={{
                  height: Convert(60),
                  width: Convert(60),
                }}
                source={require('../../assets/images/trash.png')}
              />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
      />
    );
  }
}

const styles = StyleSheet.create({
  alarmContainer: {
    height: Convert(100),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderColor: 'rgba(235, 235,235, 1)',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,
  },
  alarm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default AlarmList;
