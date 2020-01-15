import { RichEmbed, User } from 'discord.js';

export default class Embed extends RichEmbed {
  user: User;

  constructor(user) {
    /**
     * @param {User} user Represents the user to whom the avatar and username will be placed in the embed footer.
     */
    super();
    this.setFooter(user.tag, user.avatarURL);
    this.setTimestamp();
    this.setColor('RANDOM');
  }
}
