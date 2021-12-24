export class Room {
  id: string;
  name: string;
  userId: string;
  constructor(id: string, name: string, userId: string) {
    this.id = id;
    this.name = name;
    this.userId = userId;
  }
}
