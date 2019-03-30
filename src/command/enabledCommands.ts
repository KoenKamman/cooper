import { HelpCommand } from "./commands/help";

const commands = [HelpCommand];

export const enabledCommands = commands.map(command => new command());
