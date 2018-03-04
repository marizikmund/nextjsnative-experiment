import index from "../_build/index";
import subfolder_subScreen1 from "../_build/subfolder/subScreen1";
import subfolder_subScreen2 from "../_build/subfolder/subScreen2";
import topScreen1 from "../_build/topScreen1";
import withOnFocus from "../_build/withOnFocus";

import React from "react"; 
  
import withRouter from "./withRouter";

import EmptyScreen from "./EmptyScreen";

const routes = {

      "index": {
        screen: withRouter(index),
      },

      "subfolder/subScreen1": {
        screen: withRouter(subfolder_subScreen1),
      },

      "subfolder/subScreen2": {
        screen: withRouter(subfolder_subScreen2),
      },

      "topScreen1": {
        screen: withRouter(topScreen1),
      },

      "withOnFocus": {
        screen: withRouter(withOnFocus),
      },

};

export default routes;
        export const config_pages = require("../pages/routes.config.js");

        export const config_pages_subfolder = require("../pages/subfolder/routes.config.js");
