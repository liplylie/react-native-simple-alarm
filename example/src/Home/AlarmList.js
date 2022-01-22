// libs
import React, {Component} from 'react';
import {
  Alert,
  Text,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Actions} from 'react-native-router-flux';
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment';
import {
  cancelAlarmById,
  activateAlarmById,
  deleteAlarmById,
  getAlarms,
} from 'react-native-simple-alarm';

// Global
import {Colors, Convert} from '../styles';

const {height, width} = Dimensions.get('window');

class AlarmList extends Component {
  state = {
    alarms: [],
  };

  async componentDidMount() {
    const alarms = await getAlarms();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      alarms,
    });
  }

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
      cancelAlarmById(alarm.id);
    } else if (value === 1) {
      activateAlarmById(alarm.id);
    }
  };

  renderAlarms = ({item}) => {
    const radio_props = [
      {label: 'On', value: 1},
      {label: 'Off', value: 0},
    ];

    if (!item) {
      return null;
    }
    return (
      <View style={styles.alarmContainer}>
        <View style={styles.radioContainer}>
          <View style={styles.alarm}>
            <TouchableOpacity onPress={() => Actions.EditAlarm({edit: item})}>
              <Text style={{fontSize: Convert(40), paddingLeft: Convert(10)}}>
                {moment(item.date).format('hh:mm A')}
              </Text>
            </TouchableOpacity>

            <RadioForm
              radio_props={radio_props}
              labelColor={'gray'}
              onPress={(value) => this.handleAlarmActivation(value, item)}
              formHorizontal={true}
              animation={true}
              initial={item.active ? 0 : 1}
              radioStyle={{paddingRight: Convert(13)}}
              style={{marginLeft: Convert(60)}}
            />
          </View>

          <View style={styles.messageView}>
            <Text>{item.message}</Text>
          </View>
        </View>
      </View>
    );
  };

  handleDeletePress = async (data, rowRef) => {
    const {item} = data;
    await cancelAlarmById(item.id);
    const updatedAlarms = await deleteAlarmById(item.id);
    this.setState({
      alarms: updatedAlarms,
    });
    if (rowRef) {
      rowRef.manuallySwipeRow(0);
    }
  };

  render() {
    return (
      <SwipeListView
        style={{
          width: width,
          height: height,
          backgroundColor: Colors.lightGray,
        }}
        data={this.state.alarms}
        renderItem={this.renderAlarms}
        keyExtractor={(item, index) => `list-item-${index}`}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.deleteView}>
            <TouchableOpacity
              onPress={() =>
                this.confirmDeletePress(data, rowMap[data.item.key])
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
    shadowOpacity: 0.2,
    backgroundColor: 'white',
  },
  alarm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteView: {
    alignSelf: 'flex-end',
    marginRight: Convert(10),
    marginTop: Convert(5),
    padding: Convert(11),
    backgroundColor: 'red',
  },
});

export default AlarmList;
