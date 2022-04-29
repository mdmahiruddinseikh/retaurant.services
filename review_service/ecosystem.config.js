module.exports = {
    apps : [{
      name   : "review-service",
      script : "./server.js",
      instances : "max",
      exec_mode : "cluster",
      args   : "limit"
    }]
  }