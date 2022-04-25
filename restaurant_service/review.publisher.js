require("dotenv").config()
const client =   require('amqplib/callback_api')

var q = 'reviews';

const url = process.env.RABBIT_MQ_URL

//callback in case of error
function bail(err) {
    console.error(err);
    process.exit(1);
  }

  
  // Publisher
function publish_review(conn, data) {
    conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue(q);
      ch.sendToQueue(q, Buffer.from(JSON.stringify(data)));
    }
  }

  client
  .connect(url, function(err, conn) {
    if (err != null) bail(err);
    console.log("connected , publishing review")
    //TODO on review service
    // total reviews and avg rating should be computed
    // on every put, post, delete method calls
    const data = {
        restaurant_id: '11111111111111',
        total_reviews: 100,
        avg_rating: 4.3
    }
    publish_review(conn, data);
  });