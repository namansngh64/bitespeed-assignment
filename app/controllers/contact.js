const { Op } = require("sequelize");
const Contact = require("../models/contact");
const { identifySchema } = require("../validators/contact");
const { successIdentify } = require("../utils/successResponse");
const { handleIdentify } = require("../services/contact");
const { flattenData } = require("../utils/identify");

const identify = async (req, res, next) => {
  try {
    await identifySchema.validateAsync(req.body);
    const { phoneNumber, email } = req.body;
    const conditions = [];
    if (phoneNumber) {
      conditions.push({ phoneNumber });
    }
    if (email) {
      conditions.push({ email });
    }
    const existingNestedContacts = await Contact.findAll({
      where:
        conditions.length > 0
          ? {
              [Op.or]: conditions
            }
          : {},
      include: [
        {
          model: Contact,
          as: "linkedContact",
          include: [
            {
              model: Contact,
              as: "linkedContacts"
            }
          ]
        },
        {
          model: Contact,
          as: "linkedContacts"
        }
      ],
      order: [["id", "ASC"]]
    });
    const existingContacts = flattenData(existingNestedContacts);
    if (existingContacts.length === 0) {
      const newContactPayload = {
        phoneNumber,
        email,
        linkPrecedence: "primary"
      };
      const newContact = await Contact.create(newContactPayload);
      const response = successIdentify([newContact]);
      return res.status(200).json(response);
    }

    const data = await handleIdentify(existingContacts, phoneNumber, email);
    const response = successIdentify(data);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = { identify };
