export default class Message {
  client;
  names: string[];

  constructor(client) {
    this.names = ['message', 'messageUpdate'];
    this.client = client;
  }

  event(message): void {
    this.client.prefixes = ['/', '-'];
    if (
      message.content.startsWith('/') &&
      !message.author.bot &&
      message.channel.type === 'text'
    ) {
      const args = message.content
        .slice(this.client.prefixes[0].length)
        .split(/\s+/g);
      const command = args.shift().toLowerCase();
      const cmd =
        this.client.commands.get(command) ||
        this.client.commands.get(this.client.aliases.get(command));
      if (cmd) {
        if (cmd.cooldown.has(message.author.id))
          return message.channel.send(
            ':stopwatch: **|** Espere um pouco antes de executar o comando novamente.'
          );
        cmd.setMessage(message);
        cmd.command(message, args);
        if (cmd.config.cooldown > 0) cmd.startCooldown(message.author.id);
      }
    }
    return undefined;
  }
}
