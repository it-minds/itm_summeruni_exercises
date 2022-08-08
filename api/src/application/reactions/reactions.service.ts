import { Inject, Injectable } from "@nestjs/common";
import { ReactionEntity, ReactionType } from "src/domain/reaction.entity";
import { IApplicationContext } from "../common/interfaces/applicationcontext.interface";
import { ICurrentUserService } from "../common/interfaces/auth/currentuser.interface";
import { PostsGateway } from "../posts/posts.gateway";
import { Reaction } from "./models/reaction.model";

@Injectable()
export class ReactionsService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext,
    @Inject("ICurrentUserService")
    private currentUserService: ICurrentUserService,
    private readonly postsGateway: PostsGateway
  ) {}

  private map(post: ReactionEntity) {
    return new Reaction({
      authorId: post.authorId,
      postId: post.postId,
      reaction: post.reaction,
    });
  }

  async findPostReactions(
    query: { postId?: number } = {}
  ): Promise<Reaction[]> {
    const reactions = await this.applicationContext.reactions.queryForMany({
      postId: query.postId ?? -1,
    });

    return reactions.map(this.map);
  }

  async createReaction(
    postId: number,
    reaction: ReactionType
  ): Promise<Reaction> {
    let existing = await this.applicationContext.reactions.queryForFirst({
      authorId: this.currentUserService.getUserId(),
      postId,
    });

    if (existing) {
      existing.reaction = reaction;
      this.applicationContext.reactions.update(existing);
    } else {
      existing = new ReactionEntity({
        authorId: this.currentUserService.getUserId(),
        postId,
        reaction,
      });
      this.applicationContext.reactions.add(existing);
    }

    await this.applicationContext.reactions.saveChanges();

    const dto = new Reaction({
      authorId: existing.authorId,
      postId: existing.postId,
      reaction: existing.reaction,
    });
    this.postsGateway.server.emit("createReaction", dto);
    return dto;
  }
}
