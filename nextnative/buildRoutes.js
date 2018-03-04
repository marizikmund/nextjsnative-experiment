const fs = require("fs-extra");
const path = require("path");
const recursive = require("recursive-readdir");

const ROUTES_FILE = "routes.js";
const PAGES_FOLDER = "pages";
const BUILD_FOLDER = "_build";

let aComponentsAlreadySyncImported = [];

async function buildRoutes(routes) {
  let finalString = "" + buildImports();
  finalString += `
import React from "react"; 
  
import withRouter from "./withRouter";

import EmptyScreen from "./EmptyScreen";

const routes = {
`;

  finalString += buildNavigator();

  finalString += `
};

export default routes;`;

  const textsRouteConfigs = await buildRoutesConfigs();
  finalString += textsRouteConfigs;

  getPages();
  buildScreens();
  saveRoutes(finalString);
}

function getPages(dir) {
  let pages = [];
  var p =
    path.normalize(__dirname + "/../" + PAGES_FOLDER + "/") +
    (dir ? dir + "/" : "");

  const pagesDirContent = fs.readdirSync(p);
  pagesDirContent.forEach(fileOrDir => {
    // console.log('zkousimm', fileOrDir);
    if (fileOrDir.includes(".js")) {
      pages.push((dir ? dir + "/" : "") + fileOrDir);
    } else if (fs.statSync(p + fileOrDir).isDirectory()) {
      const filesInSubDirectory = getPages((dir ? dir + "/" : "") + fileOrDir);
      if (
        filesInSubDirectory.length > 0 &&
        !(
          filesInSubDirectory.length === 1 &&
          filesInSubDirectory[0].includes("routes.config")
        )
      ) {
        pages = pages.concat(filesInSubDirectory);
      } else {
        pages = pages.concat((dir ? dir + "/" : "") + fileOrDir + "/null");
      }
    }
  });
  return pages;
}

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

function getFolders(dir) {
  let folders = [];
  var p =
    path.normalize(__dirname + "/../" + PAGES_FOLDER + "/") +
    (dir ? dir + "/" : "");

  const pagesDirContent = fs.readdirSync(p);

  pagesDirContent.forEach(fileOrDir => {
    if (
      !fileOrDir.includes(".js") &&
      fs.statSync(p + fileOrDir).isDirectory()
    ) {
      folders.push(fileOrDir);
    }
  });

  return folders;
}

async function getFoldersWithSubdirectories(dir) {
  try {
    const aa = await recursive(
      path.normalize(__dirname + "/../" + PAGES_FOLDER + "/")
    );
    const onlyFolders = aa.map(name => {
      let updatedName = name
        .split("/")
        .slice(0, -1)
        .join("/")
        .split(path.normalize(__dirname + "/../"))
        .join("");
      return updatedName;
    });

    const uniqueFolders = uniq_fast(onlyFolders);
    return uniqueFolders;
  } catch (error) {
    console.log("Error getting folders ", error);
    return [];
  }
}

function buildImports() {
  return (
    getPages()
      .map(file =>
        file
          .split(".js")
          .slice(0, -1)
          .join("")
      )
      .filter(
        fileName =>
          !fileName.endsWith("routes.config") &&
          fileName
            .split("/")
            .join("_")
            .split(".")
            .join("_").length > 0
      )
      .map(file => {
        const fileName = file
          .split("/")
          .join("_")
          .split(".")
          .join("_");
        return `import ${fileName} from "../${BUILD_FOLDER}/${file}";`;
      }).join(`
`) +
    `
`
  );
}

function buildNavigator() {
  return getPages()
    .map(file => {
      if (file.endsWith(".js")) {
        return file
          .split(".js")
          .slice(0, -1)
          .join("");
      } else {
        return file;
      }
    })
    .filter(fileName => !fileName.endsWith("routes.config"))
    .map(file => {
      if (file.endsWith("/null")) {
        return `      "${file
          .split("/null")
          .slice(0, -1)
          .join("")}": {
        screen: ()=><EmptyScreen address="${file
          .split("/null")
          .slice(0, -1)
          .join("")}" />
      },`;
      }
      return `
      "${file}": {
        screen: withRouter(${file
          .split("/")
          .join("_")
          .split(".")
          .join("_")}),
      },
`;
    })
    .join(``);
}
async function buildRoutesConfigs() {
  const folders = await getFoldersWithSubdirectories();
  return folders
    .filter(file => {
      const pa = path.normalize(__dirname + "/../"); //+ PAGES_FOLDER + "/"
      try {
        if (fs.statSync(pa + file).isDirectory()) {
          if (fs.existsSync(pa + file + "/routes.config.js")) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      } catch (error) {
        // console.log("Error folder ", error);
        return false;
      }
    })
    .map(
      file => `
        export const config_${file
          .split("/")
          .join("_")
          .split("..")
          .join("")} = require("../${
        file
        // .split(PAGES_FOLDER)
        // .join(BUILD_FOLDER)
      }/routes.config.js");
`
    )
    .join(``);
}

function saveRoutes(sBuildString) {
  let oldRouterString = fs
    .readFileSync(path.join(__dirname, ROUTES_FILE))
    .toString();
  if (sBuildString !== oldRouterString) {
    fs.writeFileSync(path.join(__dirname, ROUTES_FILE), sBuildString);
  }
}

function buildScreens() {
  // now only copy files to /.build, otherwise the app crashes after deleting a screen
  try {
    fs.removeSync(path.normalize(__dirname + "/../" + BUILD_FOLDER));
    fs.copy(
      path.normalize(__dirname + "/../" + PAGES_FOLDER + "/"),
      path.normalize(__dirname + "/../" + BUILD_FOLDER),
      { overwrite: true },
      function(err) {
        if (err) {
          // console.error(err);
        }
      }
    );
  } catch (error) {
    // console.log("Error removing dir ", error);
  }
}

module.exports = buildRoutes;
// module.exports = function() {console.log('aa');return;};
