import { config } from 'dotenv';
import Client from './client/DiscordClient';

config();

const client = new Client({
  fetchAllMembers: true
  /**
   * @param {Object} options Represents all options for create Client. Same as new Discord.Client()
   */
});

client.loadEvents('src/app/events');
client.loadCommands('src/app/commands');

client.login(process.env.token);
