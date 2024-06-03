const flattenData = (data, idMap = {}) => {
  if (!data || data.length === 0) return [];
  const response = [];

  for (const contact of data) {
    if (!idMap[contact.id]) {
      response.push({
        id: contact.id,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        linkPrecedence: contact.linkPrecedence,
        linkedId: contact.linkedId
      });
      idMap[contact.id] = true;
    }
    if (contact.linkedId) {
      const linkedContact = contact.linkedContact;
      if (linkedContact && !idMap[linkedContact.id]) {
        response.push({
          id: linkedContact.id,
          phoneNumber: linkedContact.phoneNumber,
          email: linkedContact.email,
          linkPrecedence: linkedContact.linkPrecedence,
          linkedId: linkedContact.linkedId
        });
        idMap[linkedContact.id] = true;
      }

      if (linkedContact?.linkedContacts) {
        response.push(...flattenData(linkedContact.linkedContacts, idMap));
      }
    }
    if (contact.linkedContacts) {
      response.push(...flattenData(contact.linkedContacts, idMap));
    }
  }
  response.sort((a, b) => a.id - b.id);

  return response;
};

module.exports = { flattenData };
