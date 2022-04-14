const usersR = require("./users");
const loginR = require("./login");
const userPanelR = require("./userPanel");
const adminPanelR = require("./adminPanel");
// const requestManagementR = require("./requestManagement");
// const arraysR = require("./arrays");

exports.routesInit = (app) => {
  app.use("/users", usersR);
  app.use("/login", loginR);
  app.use("/UserPanel", userPanelR);
  app.use("/AdminPanel", adminPanelR);
};
