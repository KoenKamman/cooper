import { Message } from "discord.js";

export abstract class Command {
  public abstract name: string;
  public abstract aliases: string[];
  public abstract description: string;
  public abstract usage?: string;
  public abstract args?: boolean;
  public abstract cooldown?: number;
  public abstract guildOnly?: boolean;
  public abstract run(msg: Message, args: string[]): void;
}
