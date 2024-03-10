const yargs = require("yargs");

const { saveContact,removeContact,contactsList } = require("./contact");

yargs.command({
  command: "create",
  aliases: ["c"],
  describe: "[create the new contact]",
  builder: {
    fullname: {
      alias: "f",
      type: "string",
      demandOption: true,
      describe: "[enter the fullname of contact",
    },
    phone: {
      alias: "p",
      type: "number",
      demandOption: true,
      describe: "[enter the phone number]",
    },
    email: {
      alias: "e",
      type: "string",
      demandOption: true,
      describe: "[enter the email address]",
    },
  },
  handler({ fullname, phone, email }) {
    saveContact(fullname, phone, email);
  },
});

yargs.command({
    command: "remove",
    aliases: ["r"],
    describe: "[remove a contact]",
    builder:{
        fullnamer: {
            alias: 'fnr',
            discribe: '[fullname of removing contact]',
            type: 'string',
            demandOption: true
        }
    },
    handler({fullnamer}){
        removeContact(fullnamer);
    }
})

yargs.command({
    command: "list",
    aliases: ["l"],
    discribe: '[show list of contacts]',
    handler(){
        contactsList();
    }
})

yargs.parse();
