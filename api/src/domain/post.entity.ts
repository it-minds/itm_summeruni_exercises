export class PostEntity {
  id: number;

  text: string;
  timestamp: number;

  replyId?: number = null;
  repostId?: number = null;
  authorId: number;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
