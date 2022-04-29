const { ImageModel } = require("../models/imageModal");

exports.organizeTickets = (tickets) => {
  let [low, medium, high] = [0, 0, 0];
  try {
    tickets.map((ticket) => {
      if (ticket.status != "Close") {
        if (ticket.urgencyLevel === "Low") low++;
        else if (ticket.urgencyLevel === "Medium") medium++;
        else high++;
      }
    });

    tickets.sort((a, b) => {
      if (a.status === "Close")
        return 1; //a is greater than b by the ordering criterion
      else if (b.status === "Close")
        return -1; //a is less than b by some ordering criterion
      else if (a.status === "Working on it") return 1;
      else if (b.status === "Working on it") return -1;
      else return 0;
    });
    return [tickets, low, medium, high];
  } catch (err) {
    console.log(err);
  }
};
