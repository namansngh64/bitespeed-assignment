const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contact = sequelize.define(
  "contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    linkPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
      defaultValue: "secondary",
      allowNull: false
    }
  },
  {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    paranoid: true
  }
);

Contact.belongsTo(Contact, {
  foreignKey: "linkedId",
  as: "linkedContact"
});

Contact.hasMany(Contact, {
  foreignKey: "linkedId",
  as: "linkedContacts"
});

Contact.sync({ force: false });

module.exports = Contact;
