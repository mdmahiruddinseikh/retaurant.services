module.exports = {
    apps : [{
      name   : "restaurant-service",
      script : "./server.js",
      instances : "max",
      exec_mode : "cluster",
      args   : "limit"
    }]
  }