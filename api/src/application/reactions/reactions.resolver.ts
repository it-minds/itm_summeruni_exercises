import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorsService } from "../authors";
import { Author } from "../authors/models/author.model";
import { Reaction } from "./models/reaction.model";
import { ReactionsService } from "./reactions.service";

@Resolver((of) => Reaction)
export class ReactionsResolver {
  constructor(
    private readonly authorService: AuthorsService,
    private readonly reactionsService: ReactionsService
  ) {}

  @ResolveField("author", (returns) => Author)
  async getReactions(@Parent() reaction: Reaction) {
    const { authorId } = reaction;
    const author = await this.authorService.findOneById(authorId);

    return author;
  }
}
