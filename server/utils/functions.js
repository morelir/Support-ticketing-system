const { ImageModel } = require("../models/imageModal");

exports.organizeTickets = async (tickets) => {
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
    data.sort((a,b) => {
      if (a.status === "Close") return 1;//a is greater than b by the ordering criterion
      else if (b.status === "Close") return -1;//a is less than b by some ordering criterion
      else if (a.status === "Working on it") return 1;
      else if (b.status === "Working on it") return -1;
      else return 0;
    });
    return [data, low, medium, high];
  } catch (err) {
    console.log(err);
  }
};
