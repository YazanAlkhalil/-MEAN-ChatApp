import Msg from './Msg';

export default class Conversation extends Parse.Object {
  constructor() {
    super('Conversation');
  }

  get users(): Parse.User[] {
    return super.get('users');
  }
  set users(value: Parse.User[]) {
    super.set('users', value);
  }
  get isTyping(): Parse.User[] {
    return super.get('isTyping');
  }
  set isTyping(value: Parse.User[]) {
    super.set('isTyping', value);
  }
  get pinnedMsg(): Msg {
    return super.get('pinnedMsg');
  }
  set pinnedMsg(value: Msg) {
    super.set('pinnedMsg', value);
  }
  
}

Parse.Object.registerSubclass('Conversation', Conversation);
