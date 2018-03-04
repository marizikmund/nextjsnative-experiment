import React from "react";
import navigationEvents from "./navigationEvents";

let currentAddress = "INIT";
let haha = "prvni";
let numCalledThisComponent = 0;
export default function withRouter(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initialData: { title: "jestene" }
      };
      this.onChangeRoute = this.onChangeRoute.bind(this);
      // console.log(
      //   "withrouteru ",
      //   Component,
      //   " nastaveny navigationOptions: ",
      //   Component.navigationOptions
      // );
      // console.log('withrouter prs navigationOptions', Component.navigationOptions, Component.getNavigationOptions, Component.nn);
      // console.log(Component.prototype);
      // console.log(this.props);
      this.onFocus = this.onFocus.bind(this);
    }
    // static navigationOptions = {
    //   title: 'Home',
    // };
    static navigationOptions = Component.navigationOptions;

    async componentDidMount() {
      // console.log("cdm volano po ", numCalledThisComponent);
      // console.log(
      //   "zkusimto: ",
      //   Component.onF,
      //   Component.onFocus,
      //   this.getNavigationOptions
      // );
      if (Component.onFocus) {
        const initialData = await Component.onFocus();
        // console.log("initla v cdm", initialData);
        this.setState({ initialData });
      }
      // var h = this.onFocus.bind(this);
      // h()
      numCalledThisComponent++;
      navigationEvents.addListener("onChangeRoute", this.onChangeRoute);
      this.props.navigation.addListener("didFocus", this.onFocus);
    }
    componentWillUnmount() {
      navigationEvents.removeListener("onChangeRoute", this.onChangeRoute);
      this.props.navigation &&
        this.props.navigation.removeListener &&
        this.props.navigation.removeListener("didFocus", this.onFocus);
    }
    async onFocus(e) {
      // console.log("focused");
      // console.log('didfocus od parent: ', Component.onF)
      if (Component.onFocus) {
        const initialData = await Component.onFocus();
        // console.log("onFreturned initialData", initialData);
        haha = "druhy";
        this.setState({
          initialData
        });
        // this.props = { ...this.props, data: { ...onFreturned } };
      }
      // console.log("didfocus od parent dynamic: ", this.onFocus);
      // try {
      //   this.onFocus();
      // } catch (e) {}
      // if (this.onFocus) {
      // }
      currentAddress = e.state.routeName;
    }

    onChangeRoute(e) {
      // console.log(
      //   "chytnuty onChangeRoute. Chci měnit z ",
      //   currentAddress,
      //   " na ",
      //   e
      // );

      // console.log("chytnuty this.prop.navigation", this.props);
      // NavigationActions.navigate({
      //   routeName: e,
      //   params: ""
      // });
      if (e === "BACK") {
        // console.log("bb", this.props.navigation);
        this.props.navigation.goBack(null);
      } else if (e === currentAddress) {
        // console.log("nepresmerovavam");
      } else {
        this.props.navigation.navigate(e);
      }
      currentAddress = e;
    }

    render() {
      return <Component {...this.props} initialData={this.state.initialData} />;
    }
  };
}
