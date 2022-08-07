export enum ReactionType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
  LOVE = "LOVE",
  CELEBRATE = "CELEBRATE",
  ANGRY = "ANGRY",
  SAD = "SAD",
  WOW = "WOW",
  LOL = "LOL",
}

export class ReactionEntity {
  authorId: number;
  postId: number;
  reaction: ReactionType;

  readonly id: string;
  constructor(partial: Partial<ReactionEntity>) {
    Object.assign(this, partial);
    this.id = `${this.authorId}-${this.postId}`;
  }
}
