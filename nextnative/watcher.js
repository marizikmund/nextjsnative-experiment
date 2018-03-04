var chokidar = require("chokidar");
var path = require("path");
var buildRoutes = require("./buildRoutes");

// One-liner for current directory, ignores .dotfiles
var pathToWatch = path.join(__dirname, "../pages/");
chokidar
  .watch(pathToWatch, { ignored: /(^|[\/\\])\../ })
  .on("all", (event, path) => {
    try {
      buildRoutes();
    } catch (error) {}
  });

  console.log('Watcher successfully started, you can play with /pages folder.');
