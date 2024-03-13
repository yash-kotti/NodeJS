const { Client, GatewayIntentBits, Message } = require("discord.js");
require("dotenv").config();
const token = process.env.TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return null;
  // console.log(message.content);
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    message.reply({
      content: "Generating short ID for : " + url,
    });
  }
  message.reply({
    content: "Hi From Bot",
  });
});
client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply({
    content: "Pong!!",
  });
});
client.login(token);
