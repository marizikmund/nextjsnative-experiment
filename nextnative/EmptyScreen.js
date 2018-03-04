import React, { Component } from "react";

import { StyleSheet, Text, View, Button } from "react-native";

export default class EmptyScreen extends Component {
  render() {
    const { address } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>This folder is empty</Text>
        <Text>Make some screen(s) in: {address}/ or make it a file</Text>
      </View>
    );
  }
}
