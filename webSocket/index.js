const mongo = require("mongodb").MongoClient;
const client = require("socket.io").listen(3000).sockets;

// Connect to mongo
mongo.connect(
  "mongodb://localhost:3000",
  { useNewUrlParser: true },
  (err, db) => {
    // if (err) throw err;

    console.log("MongoDB Connected!!");

    client.on("connection", () => {
      let chat = db.collection("chat");

      // create func to send status
      sendStatus = s => {
        socket.emit("status", s);
      };

      // get chats from mongo collection
      chat
        .find()
        .limit(100)
        .sort({ _id: 1 })
        .toArray((err, res) => {
          if (err) throw err;

          // emit the messages..
          socket.emit("output", res);
        });

      // handle input events..

      socket.on("input", data => {
        let name = data.name;
        let message = data.message;

        // check for name and message..
        if (name == "" || message == "") {
          // send error status..
          sendStatus("Please Enter Name and a Message...");
        } else {
          // insert message
          chat.insert({ name: name, message: message }, () => {
            client.emit("output", [data]);

            // send status object
            sendStatus({
              message: "Message sent",
              clear: true
            });
          });
        }
      });
      //
      socket.on("clear", data => {
        chat.remove({}, () => {
          socket.emit("clear");
        });
      });
    });
  }
);
