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
        <Text>subScreen1</Text>
        <Button
          title="go to subScreen2"
          onPress={() => Router.push("subfolder/subScreen2")}
        />
      </View>
    );
  }
}
