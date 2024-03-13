const { REST, Routes } = require("discord.js");
require("dotenv").config();
const token = process.env.TOKEN;
// console.log("Token " + token);
// List of commands
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

// Create a command
const rest = new REST({ version: "10" }).setToken(token);
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1216966636888789033"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
