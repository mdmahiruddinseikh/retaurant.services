require("dotenv").config()
const client =   require('amqplib/callback_api')

var q = 'order';

const url = process.env.RABBIT_MQ_URL

//callback in case of error
function bail(err) {
    console.error(err);
    process.exit(1);
  }


  // Consumer
function consumer(conn) {
    var ok = conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue(q);
      ch.consume(q, function(msg) {
        if (msg !== null) {
            const content = msg.content.toString()
            const data = JSON.parse(content)
            console.log("Review is ", data)
            // TODO: after receiving message, call the service
            // and update total reviews and avg rating in mongo db for the restaurent

          console.log(msg.content.toString());
          ch.ack(msg);
        }
      });
    }
  }


  client
  .connect(url, function(err, conn) {
    if (err != null) bail(err);
     console.log("connected , starting consumer")
    consumer(conn);
  });