module.exports = {
    apps : [{
      name   : "review-service",
      script : "./server.js",
      instances : "max",
      exec_mode : "cluster",
      args   : "limit"
    },{
      name   : "susbcribe-review",
      script : "./rest.subcriber.js",
      args   : "rotate"
    }]
  }