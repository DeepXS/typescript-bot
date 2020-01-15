import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import CommandListener from '@CommandListener';

export default class DiscordClient extends Client {
  commands: Collection<string, CommandListener>;

  aliases: Collection<string, string>;

  async loadCommands(path: string): Promise<void> {
    /**
     * Load all commands of a path
     * @param {String} path Represents the path in which commands will be read.
     * @this {commands} Collection in which commands will be saved to execute.
     * @this {aliases} Collection where alternatives will be saved with command name
     */

    this.commands = new Collection();
    this.aliases = new Collection();
    const files: string[] = readdirSync(path);
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const CommandClass = (await import(`${__dirname}/../../${path}/${file}`))
        .default;
      const command = new CommandClass(this);
      this.commands.set(command.config.name, command);
      for (let index = 0; index < command.config.aliases.length; index += 1) {
        this.aliases.set(command.config.aliases[index], command.config.name);
      }
    }
  }

  async loadEvents(path: string): Promise<void> {
    /**
     * Load all events of a path
     * @param {String} path Represents the path in which events will be read.
     */
    const files: string[] = readdirSync(path);
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const EventClass = (await import(`${__dirname}/../../${path}/${file}`))
        .default;
      const event = new EventClass(this);
      for (let i = 0; i < event.names.length; i += 1) {
        this.on(event.names[i], (...args) => event.event(...args));
      }
    }
  }
}
