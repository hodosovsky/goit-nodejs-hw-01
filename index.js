const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// addContact("mango", "mango@gmail.com", "322-22-22");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await listContacts();
      console.table(data);
      break;

    case "get":
      const getedContact = await getContactById(id);
      if (!getedContact) {
        console.log("No such contact exists");
        break;
      }
      console.log(getedContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      const contacts = await listContacts();
      console.log("New contact: ", newContact);
      console.table(contacts);
      break;

    case "remove":
      const removedContact = await removeContact(id);

      if (!removedContact) {
        console.log("No such contact exists");
        break;
      }
      const contactsAfterRemove = await listContacts();
      console.log("Deleted contact: ", removedContact);
      console.table(contactsAfterRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
