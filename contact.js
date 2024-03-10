const fs = require("fs");

const chalk = require("chalk");

const saveContact = (fullname, phone, email) => {
  const contacts = loadContacts();
  const duplicatedContact = contacts.find((c) => c.fullname == fullname);
  if (!duplicatedContact) {
    contacts.push({ fullname, phone, email });
    saveContacts(contacts);
    console.log(chalk.bgGreen("contact saved!"));
  } else {
    console.log(chalk.bgYellow("contact already exist!!!"));
  }
};

const loadContacts = () => {
  try {
    //first read contacts.json buffer data
    const bufferData = fs.readFileSync("contacts.json");
    //change it to string
    const stringData = bufferData.toString();
    //change string data to object
    const contactsObject = JSON.parse(stringData);
    //return object data
    return contactsObject;
  } catch (err) {
    //if we have not contcats.json file or contacts.json have not data
    return [];
  }
};

const removeContact = (fullnamer) => {
  const contacts = loadContacts();
  const existedContact = contacts.find((c) => c.fullname == fullnamer);
  if (existedContact) {
    const filteredContacts = contacts.filter((c) => c.fullname != fullnamer);
    saveContacts(filteredContacts);
    console.log(chalk.bgGreen("contact removed!"));
  } else {
    console.log(chalk.bgRed("contact not found!!!"));
  }
};

const saveContacts = (contacts) => {
  const stringfyContacts = JSON.stringify(contacts);
  fs.writeFileSync("contacts.json", stringfyContacts);
};

const contactsList = ()=>{
    const contacts = loadContacts();
    if(contacts.length > 0){
        console.log(chalk.yellow('contacts:'))
        console.table(contacts);
    }else{
        console.log(chalk.red('No contacts found'));
    }
}

module.exports = {
  saveContact,
  removeContact,
  contactsList
};
