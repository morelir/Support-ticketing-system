// const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb+srv://supportTicketing:support1234@support-ticketing-syste.10xxd.mongodb.net/Support-ticketing-system?retryWrites=true&w=majority"
// );
// // mongoose.connect('mongodb://localhost:27017/express0', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("mongo connected");
//   // we're connected!
// });

// module.exports = db;

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://supportTicketing:support1234@support-ticketing-syste.10xxd.mongodb.net/Support-ticketing-system?retryWrites=true&w=majority"
  );
  console.log("mongo connected");
}

module.exports = mongoose;
