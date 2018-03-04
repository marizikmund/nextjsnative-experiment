import React from "react";
import { StackNavigator, TabNavigator, TabBarTop } from "react-navigation";

import routes from "./routes";
import * as routeConfigs from "./routes";

const routesConfig = routeConfigs.config_pages
  ? routeConfigs.config_pages.default
  : {};

  console.log('routesConfig', routesConfig);

const ONLY_TAB_NAVIGATOR = false;

let stacks = {}; 
fillStacksInAllFolders();

const topRoutes = buildTopRoutes(routes);
console.log("topRoutes", topRoutes, routesConfig);

const AppNavigator =
  routesConfig === undefined ||
  !routesConfig.navigator ||
  routesConfig.navigator === "TAB" ||
  ONLY_TAB_NAVIGATOR
    ? TabNavigator(topRoutes, routesConfig && routesConfig.navigatorConfig)
    : StackNavigator(topRoutes, routesConfig && routesConfig.navigatorConfig);

function routesToFolders(routes) {
  var arr = [];
  for (var i in routes) {
    if (routes.hasOwnProperty(i) && i.includes("/")) {
      arr.push(i);
    }
  }
  return arr;
}

function fillStacksInAllFolders(folders) {
  if (!folders) folders = routesToFolders(routes);
  folders.forEach(folder => {
    const folderToParts = folder.split("/");
    const folderName = folderToParts[0];
    const configForFolder =
      routeConfigs["config_pages_" + folderName] &&
      routeConfigs["config_pages_" + folderName].default
        ? routeConfigs["config_pages_" + folderName].default
        : undefined;

    if (folderToParts.length > 2) {
      const nameSubFolder = folderName + "/" + folderToParts[1];
      const nameForConfigImportVar =
        "config_pages_" + nameSubFolder.split("/").join("_");

      const configForFolder =
        routeConfigs[nameForConfigImportVar] &&
        routeConfigs[nameForConfigImportVar].default
          ? routeConfigs[nameForConfigImportVar].default
          : undefined;

      stacks[nameSubFolder] =
        !configForFolder ||
        !configForFolder.navigator ||
        configForFolder.navigator === "TAB" ||
        ONLY_TAB_NAVIGATOR
          ? TabNavigator(
              getRoutesInFolder(routes, nameSubFolder),
              configForFolder && configForFolder.navigatorConfig
            )
          : StackNavigator(
              getRoutesInFolder(routes, nameSubFolder),
              configForFolder && configForFolder.navigatorConfig
            );
    }

    const realRoutes = getRoutesInFolder(routes, folderName);

    if (realRoutes) {
      stacks[folderName] =
        !configForFolder ||
        !configForFolder.navigator ||
        configForFolder.navigator === "TAB" ||
        ONLY_TAB_NAVIGATOR
          ? TabNavigator(
              realRoutes,
              configForFolder && configForFolder.navigatorConfig
            )
          : StackNavigator(
              realRoutes,
              configForFolder && configForFolder.navigatorConfig
            );
    }
  });
}

function buildTopRoutes(routes) {
  let obj = {};
  var arr = [];

  for (var i in routes) {
    if (routes.hasOwnProperty(i)) {
      // console.log("jdu ", i);
      if (!i.includes("/")) {
        // console.log("1");
        obj[i] = routes[i];
      } else {
        // console.log("2");
        obj[i.split("/")[0]] = {
          screen: stacks[i.split("/")[0]],
          screenName: `${i.split("/")[0]}`
        };
      }
    } else {
      // console.log("nepovedlo", routes[i]);
    }
  }
  return obj;
}

function getRoutesInFolder(routes, address) {
  let obj = {};
  for (var i in routes) {
    if (routes.hasOwnProperty(i)) {
      if (i.indexOf(address) === 0) {
        // starts with it = the route
        const newRouteName = i.split(address)[1].substr(1);
        if (newRouteName.includes("/")) {
          // still has subfolders
          const subAddress = address + "/" + newRouteName.split("/")[0];
          const subFolders = getRoutesInFolder(routes, subAddress);
          for (var x in subFolders) {
            if (subFolders.hasOwnProperty(x)) {
              const newRouteNameSub = subAddress + "/" + x;
              const routeStackName =
                address + "/" + newRouteNameSub.split("/")[1];
              if (stacks[routeStackName]) {
                const configRouteName =
                  "config_pages_" +
                  newRouteNameSub
                    .split("/")
                    .slice(0, -1)
                    .join("_");
                const configNavigationOptionsForFolder =
                  routeConfigs[configRouteName] &&
                  routeConfigs[configRouteName].default &&
                  routeConfigs[configRouteName].default.navigationOptions
                    ? routeConfigs[configRouteName].default.navigationOptions
                    : {};
                obj[newRouteNameSub.split("/")[1]] = {
                  screen: stacks[routeStackName],
                  navigationOptions: configNavigationOptionsForFolder,
                  screenName: `${routeStackName}`
                };
              } else {
                return null;
              }
            }
          }
        } else {
          const routeNameWithAddress = address + "/" + newRouteName;
          console.log("else", routeNameWithAddress);
          if (newRouteName){
          obj[routeNameWithAddress] = routes[i];}
        }
      }
    }
  }
  console.log("subroutes ", address, ": ", obj);
  return obj;
}

export default AppNavigator;
