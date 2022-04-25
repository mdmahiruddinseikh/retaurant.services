module.exports = (sequelize, Sequelize) => {
  var orders = sequelize.define("orders", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL
    },
    customer_id: {
      type: Sequelize.STRING(100),
    },
    amount: {
      type: Sequelize.FLOAT(11, 4)
    },
    order_status: {
      type: Sequelize.STRING(255),
      defaultValue: "order placed"
    },
    'createdAt': {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    'updatedAt': {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    }
  }, {
    freezeTableName: true, //this will freeze table name.
    timestamps: false,
  });
  return orders;
};