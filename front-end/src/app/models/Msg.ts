import Conversation from './Conversation';

export default class Msg extends Parse.Object {
  constructor() {
    super('Msg');
  }

  get text(): string {
    return super.get('text');
  }
  set text(value: string) {
    super.set('text', value);
  }

  get reciver(): Parse.User {
    return super.get('reciver');
  }
  set reciver(value: Parse.User) {
    super.set('reciver', value);
  }

  get conversation(): Conversation {
    return super.get('conversation');
  }
  set conversation(value: Conversation) {
    super.set('conversation', value);
  }
  
  get isSeen(): boolean {
    return super.get('isSeen');
  }
  set isSeen(value: boolean) {
    super.set('isSeen', value);
  }

  get replay(): Msg {
    return super.get('replay');
  }
  set replay(value: Msg) {
    super.set('replay', value);
  }

  get emoji(): string {
    return super.get('emoji');
  }
  set emoji(value: string) {
    super.set('emoji', value);
  }
  
  
  get isSaved(): boolean {
    return super.get('isSaved');
  }
  set isSaved(value: boolean) {
    super.set('isSaved', value);
  }
    
}

Parse.Object.registerSubclass('Msg', Msg);
