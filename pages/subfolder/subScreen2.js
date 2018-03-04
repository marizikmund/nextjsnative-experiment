import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Router } from "../../nextnative";

export default class App extends React.Component {
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
        <Text>page in subfolder</Text>
        <Button
          title="go to parent directory index"
          onPress={() => Router.push("index")}
        />
        <Button
          title="go to same directory screen subScreen1"
          onPress={() => Router.push("subfolder/subScreen1")}
        />
      </View>
    );
  }
}
