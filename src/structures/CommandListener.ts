import { Client, Message } from 'discord.js';

export default class CommandListener {
  client: Client;
  config: {
    name: string;
    cooldownTime: number;
    aliases: string[];
  };
  cooldown: Set<string>;
  message: Message;

  constructor(client, options) {
    /**
     * @param {Client} client Represents the client
     * @param {Object} options The options of this command
     * @module discord.js Represents library used to make the bot
     */

    this.client = client;

    this.config = {
      name: options.name,
      cooldownTime: options.cooldown || 3000,
      aliases: options.aliases || []
    };

    this.cooldown = new Set();
  }

  startCooldown(user): void {
    this.cooldown.add(user);
    setTimeout(() => {
      this.cooldown.delete(user);
    }, this.config.cooldownTime);
  }

  setMessage(message): void {
    this.message = message;
  }

  send(message): void {
    this.message.channel.send(message);
  }
}
