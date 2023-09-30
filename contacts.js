const fs = require("fs/promises");
const path = require("path");
const id = () => new Date().getTime();
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function readContacts() {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch (e) {
        console.log(e.message);
    }
}

async function updateContacts(contacts) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
    } catch (error) {
        console.log(error.message);
    }
}

async function listContacts() {
    const contacts = await readContacts();
    console.table(contacts);
};

async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId.toString());

    if (contact) {
        console.table([contact]);
    } else {
        console.log("Контакт з вказаним ID не знайдено.");
    }
}

async function removeContact(contactId) {
    const contacts = await readContacts();
    const remove = contacts.filter((contact) => contact.id !== contactId.toString());
    updateContacts(remove);
    listContacts();
}

async function addContact(name, email, phone) {
    const newContact = {
        id: id().toString(),
        name: name,
        email: email,
        phone: phone,
    };
    let contacts = await readContacts();
    contacts.push(newContact);
    updateContacts(contacts);
    listContacts();
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};