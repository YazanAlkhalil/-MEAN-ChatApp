export default class Employee extends Parse.Object {
  constructor() {
    super('Employee');
  }

  get name(): string {
    return super.get('name');
  }
  set name(value: string) {
    super.set('name', value);
  }
}

Parse.Object.registerSubclass('Employee', Employee);
