import React from "react";
import Navigator from "./navigator";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import navigationEvents from "./navigationEvents";
import { withNavigation, NavigationActions } from "react-navigation";

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator onNavigateStateChange={(e)=>console.log('ccccc', e)} />
      </View>
    );
  }
}
export default App;
// class extends React.Component {
//     componentDidMount() {
//       console.log("cdm hlavni");
//     }

//     render() {
//       return <Navigator />;
//     }
//   }
