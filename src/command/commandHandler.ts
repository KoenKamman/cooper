import { Collection, Message } from "discord.js";
import { Command } from "./command";
import { enabledCommands } from "./enabledCommands";

export class CommandHandler {
  private readonly prefix: string;
  private commands: Command[];
  private cooldowns: Collection<string, Collection<string, number>>;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.commands = enabledCommands;
    this.cooldowns = new Collection();
    this.commands.forEach(command => this.cooldowns.set(command.name, new Collection()));
  }

  public async handleMessage(message: Message): Promise<void> {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return;

    const args = message.content.slice(this.prefix.length).split(/ +/);
    const commandName = args.shift()!.toLowerCase();
    const command = this.commands.find(cmd => cmd.name === commandName || (cmd.aliases && cmd.aliases.includes(commandName)));
    if (!command) return;

    if (command.guildOnly && message.channel.type !== "text") {
      message.reply(`the \`${command.name}\` command is not available in DM's, try using it in a guild instead!`);
      return;
    }

    if (command.args && !args.length) {
      let reply = `the \`${command.name}\` command requires arguments!`;
      if (command.usage) reply += `\nExample: \`${this.prefix}${command.name} ${command.usage}\``;
      message.channel.send(reply);
      return;
    }

    const now = Date.now();
    const timestamps = this.cooldowns.get(command.name)!;
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id)! + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        message.reply(`the \`${command.name}\` command is on cooldown for ${timeLeft.toFixed(1)} more second(s).`);
        return;
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.run(message, args);
    } catch (error) {
      message.reply(`an error occurred while running the \`${command.name}\` command.`);
    }
  }
}
