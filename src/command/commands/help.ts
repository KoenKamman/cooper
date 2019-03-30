import { Message } from "discord.js";
import { Command } from "../command";
import { enabledCommands } from "../enabledCommands";

export class HelpCommand implements Command {
  public name = "help";
  public aliases = [];
  public description = "Displays all available commands.";
  public run(msg: Message, args: string[]): void {
    msg.reply("check your DM's!");
    msg.author.sendMessage(`\`\`\`${enabledCommands.map(command => command.name + ": " + command.description).join("\n")}\`\`\``);
  }
}
