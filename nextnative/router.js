import navigationEvents from "./navigationEvents";
export default class Router {
  static push(e) {
    // console.log("router push", e);
    navigationEvents.emit("onChangeRoute", e);
  }
  static back(e) {
    // console.log("router back");
    navigationEvents.emit("onChangeRoute", "BACK");
  }
}
