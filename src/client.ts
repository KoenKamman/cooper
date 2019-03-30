import { Client as DiscordClient } from "discord.js";
import { CommandHandler } from "./command/commandHandler";
import { Config } from "./config";

export class Client extends DiscordClient {
  public config: Config;
  public commandHandler: CommandHandler;

  constructor(config: Config) {
    super({ disabledEvents: ["TYPING_START"], disableEveryone: true });
    this.config = config;
    this.commandHandler = new CommandHandler(this.config.prefix);
  }
}
