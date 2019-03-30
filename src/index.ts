import { Message } from "discord.js";
import { Client } from "./client";

const client = new Client({
  prefix: process.env.DISCORD_PREFIX || "",
  token: process.env.DISCORD_TOKEN || ""
});

client.on("ready", () => {
  client.user.setActivity(`${client.config.prefix}help`);
});

client.on("message", (message: Message) => {
  client.commandHandler.handleMessage(message);
});

client.login(client.config.token);
