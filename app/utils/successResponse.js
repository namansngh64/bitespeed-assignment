const successIdentify = (data) => {
  const primaryContact = data[0];
  data.splice(0, 1);
  const emails = [];
  const phoneNumbers = [];
  const secondaryContactIds = [];

  emails.push(primaryContact.email);
  phoneNumbers.push(primaryContact.phoneNumber);

  for (const contact of data) {
    if (contact.email) {
      emails.push(contact.email);
    }
    if (contact.phoneNumber) {
      phoneNumbers.push(contact.phoneNumber);
    }
    secondaryContactIds.push(contact.id);
  }
  const response = {
    contact: {
      primaryContatctId: primaryContact.id,
      email: emails,
      phoneNumber: phoneNumbers,
      secondaryContactIds
    }
  };
  return response;
};

module.exports = { successIdentify };
