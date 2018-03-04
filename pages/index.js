import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Router } from "../nextnative";

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Index',
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
        <Text>Index</Text>
        <Button
          title="go to topScreen1"
          onPress={() => Router.push("topScreen1")}
        />
        <Button
          title="go to subfolder"
          onPress={() => Router.push("subfolder")}
        />
      </View>
    );
  }
}
