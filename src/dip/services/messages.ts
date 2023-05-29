import { MessageProtocol } from '../classes/interfaces/messagin-protocol';

export class Message implements MessageProtocol {
  sendMessage(msg: string): void {
    console.log('Message sent:', msg);
  }
}
