const Contact = require("../models/contact");

const handleIdentify = async (existingContacts, phoneNumber, email) => {
  let phoneNumberAbsent = true;
  let emailAbsent = true;
  const updateContactIds = [];
  for (let idx = 0; idx < existingContacts.length; idx++) {
    const contact = existingContacts[idx];
    if (contact.phoneNumber === phoneNumber) {
      phoneNumberAbsent = false;
    }
    if (contact.email === email) {
      emailAbsent = false;
    }
    if (idx > 0 && contact.linkPrecedence === "primary") {
      updateContactIds.push(contact.id);
    }
  }
  if ((email && emailAbsent) || (phoneNumber && phoneNumberAbsent)) {
    const newContactPayload = {
      phoneNumber,
      email,
      linkPrecedence: "secondary",
      linkedId: existingContacts[0].id
    };
    const newContact = await Contact.create(newContactPayload);
    existingContacts.push(newContact);
  }
  if (updateContactIds.length > 0) {
    await Contact.update(
      { linkPrecedence: "secondary", linkedId: existingContacts[0].id },
      { where: { id: updateContactIds } }
    );
  }

  return existingContacts;
};

module.exports = { handleIdentify };
