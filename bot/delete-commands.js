const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./index.js');

const rest = new REST().setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: [] })
.then(() => console.log('Successfully deleted all application commands.'))
.catch(console.error);
