import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Router } from "../nextnative";

export default class App extends React.Component {
  static navigationOptions = {
    title: 'With onFocus',
  };

  static async onFocus() { // returned value in props.initialData
    return {
      title: "SomeText"
    }
  }

  render() {
    const {title} = this.props.initialData

    return (
      <View 
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>Text from async onFocus: {title}</Text>
        
      </View>
    );
  }
}
