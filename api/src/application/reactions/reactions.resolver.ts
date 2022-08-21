import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorsService } from "../authors";
import { Author } from "../authors/models/author.model";
import { PostsService } from "../posts";
import { Post } from "../posts/models/post.model";
import { Reaction } from "./models/reaction.model";
import { ReactionsService } from "./reactions.service";

@Resolver((of) => Reaction)
export class ReactionsResolver {
  constructor(
    private readonly authorService: AuthorsService,
    private readonly postService: PostsService,
    private readonly reactionsService: ReactionsService
  ) {}

  @ResolveField("author", (returns) => Author)
  async getAuthor(@Parent() reaction: Reaction) {
    const { authorId } = reaction;
    const author = await this.authorService.findOneById(authorId);

    return author;
  }

  @ResolveField("post", (returns) => Post)
  async getPost(@Parent() reaction: Reaction) {
    const { postId } = reaction;
    const author = await this.postService.findOneById(postId);

    return author;
  }
}
