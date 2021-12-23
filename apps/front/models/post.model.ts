
export class Post {
  constructor(id: string, message: string, ownerId: string, createdAt: Date) {
    this.id = id;
    this.message = message;
    this.ownerId = ownerId;
    this.createdAt = createdAt;
  }

  id: string;
  message: string;
  ownerId: string;
  createdAt: Date;

}
