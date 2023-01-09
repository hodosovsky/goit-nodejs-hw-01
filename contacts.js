const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newData = {
      id: "13",
      name: "name2",
      email: "mail1@mail.ua",
      phone: "1234566789",
    };

    // const rezultData = JSON.parse(data);
    data.push(newData);
    // console.log(data);
    await fs.writeFile("./data.json", JSON.stringify(data, null, 2));

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

addContact();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
