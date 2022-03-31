const indexR = require("./index");
// const userR = require("./users");
// const loginR = require("./login");
// const registerR = require("./register");
// const faultManagementR = require("./faultManagement");
// const requestManagementR = require("./requestManagement");
// const arraysR = require("./arrays");

exports.routesInit = (app) => {
  app.get("/", indexR);
};
