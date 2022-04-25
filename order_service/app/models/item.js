module.exports = (sequelize, Sequelize) => {
  var orders = sequelize.define("items", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL
    },
    menu_id: {
      type: Sequelize.STRING(100),
    },
    restaurant_id: {
      type: Sequelize.STRING(100),
    },
    price: {
      type: Sequelize.FLOAT(11, 4)
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
    timestamps: false, // added for bulk insert('createdAt' 'updatedAt' and  default field ignore)
    underscored: true // added for bulk insert('createdAt' 'updatedAt' and  default field ignore)
  });
  return orders;
};