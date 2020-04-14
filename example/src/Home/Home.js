import React from "react";
import { View, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";

// Global
import { Convert } from "../styles";

// Components
import NavBar from "../Common/NavBar";
import AlarmList from "./AlarmList";

const Home = () => {
  const handleMusicSymbolPress = () => {
    Actions.Game();
  };

  const handleAddAlarm = () => {
    Actions.AddAlarms();
  };

  return (
    <View style={{ display: "flex", flex: 1 }}>
      <NavBar
        title="Alarms"
        leftButtonIcon="music"
        rightButtonIcon="plus"
        onLeftButtonPress={handleMusicSymbolPress}
        onRightButtonPress={handleAddAlarm}
      />
      <ScrollView contentContainerStyle={{ display: "flex", flex: 1 }}>
        <AlarmList />
      </ScrollView>
    </View>
  );
};

export default Home;
