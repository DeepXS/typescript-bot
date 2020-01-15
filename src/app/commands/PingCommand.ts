import { Client } from 'discord.js';
import CommandListener from '@CommandListener';

export default class PingCommand extends CommandListener {
  client: Client;

  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['ms'],
      cooldown: 3000
    });
    this.client = client;
  }

  command(): void {
    super.send(
      `<:dm:627895597684359211> » Latência: ${Math.floor(
        this.client.ping
      )}**ms**`
    );
  }
}
