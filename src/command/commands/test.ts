import { Message } from "discord.js";
import { Command } from "../command";

export class TestCommand implements Command {
  public name = "test";
  public aliases = ["t", "bruh"];
  public description = "A test command.";
  public usage = "usaaaaage";
  public args = true;
  public cooldown = 5;
  public guildOnly = true;
  public run(msg: Message, args: string[]): void {
    msg.reply("brsdfsdfsdf");
  }
}
