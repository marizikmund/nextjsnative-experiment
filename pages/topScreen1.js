import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Router } from "../nextnative";

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Top Screen 1',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>topScreen1</Text>
        
      </View>
    );
  }
}
