import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {Router, App} from "./nextnative";
import { StackNavigator, TabNavigator, TabBarTop } from "react-navigation";

// import Index from './pages/index' 
// const AppNavigator = StackNavigator(
//   {
//     Index: {
//       screen: Index,
//       navigationOptions: {
//         // header: props => <SimpleHeader navigate={props} /> //dat podto
//         // header: null
//       }
//     }
//   },
//   {
//     // initialRouteName: "Search", //
//     mode: "card",
//     // transitionConfig: getSlideFromRightTransition
//   }
// );

// export default AppNavigator
export default App

 class Application extends React.Component {
  render() {
    return <App />
    // return (
    //   <View style={styles.container}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //     <Text>Changes you make will automatically reload.</Text>
    //     <Text>Shake your phone to open the developer menu.</Text>
    //     <Button
    //       title="log"
    //       onPress={() => {
    //         // const {Router} = next
    //         console.log("Router", Router);
    //         Router.push()
    //         // console.log("h");
    //         // Router.push('cha')
    //       }}
    //     />
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
