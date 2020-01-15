export default class Ready {
  client;
  names: string[];

  constructor(client) {
    this.names = ['ready'];
    this.client = client;
  }

  event(): void {
    console.log(`${this.client.user.username} | Online`);
  }
}
