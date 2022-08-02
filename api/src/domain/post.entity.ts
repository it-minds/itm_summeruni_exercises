export class PostEntity {
  id: number;

  text: string;
  timestamp: number;

  replyId?: number;
  authorId: number;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
