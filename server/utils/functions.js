const { ImageModel } = require("../models/imageModal");

exports.organizeTickets = async (tickets) => {
  // mergeTicketsWithImage and sorted by status
  let [low, medium, high] = [0, 0, 0];
  try {
    let data = await Promise.all(
      tickets.map(async (ticket) => {
        let image = await ImageModel.findOne(
          { filePath: { $regex: ticket.number, $options: "i" } },
          "-_id filePath"
        ).lean();
        if (ticket.urgencyLevel === "Low") low++;
        else if (ticket.urgencyLevel === "Medium") medium++;
        else high++;
        return {
          ...ticket,
          filePath: image.filePath,
        };
      })
    );
    data.sort((ticket) => {
      if (ticket.status === "Open") return -1;
      else if (ticket.status === "Working on it") return 0;
      else return 1;
    });
    return [data, low, medium, high];
  } catch (err) {
    console.log(err);
  }
};
