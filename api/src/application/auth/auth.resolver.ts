import {
  Int,
  Parent,
  Args,
  Resolver,
  Query,
  ResolveField,
  Mutation,
  ComplexityEstimatorArgs,
} from "@nestjs/graphql";
import { PostsPage } from "../posts/models/post.page.model";
import { PostsService } from "../posts/posts.service";
import { AuthService } from "./auth.service";
import { LoginInput } from "./models/login.input";
import { Me } from "./models/me.model";
import { Public } from "./public.decorator";

@Resolver((of) => Me)
export class AuthResolver {
  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  @Query((returns) => Me, { name: "me" })
  async getMe() {
    return await this.authService.findMe();
  }

  @Mutation((returns) => String)
  @Public()
  async login(@Args("loginData") { username, password }: LoginInput) {
    return await this.authService.login(username, password);
  }

  @ResolveField("posts", (returns) => PostsPage, {
    complexity: (options: ComplexityEstimatorArgs) =>
      options.args.first * options.childComplexity,
  })
  async getMyPosts(
    @Parent() me: Me,
    @Args("first", { type: () => Int }) first: number,
    @Args("after", { type: () => String, nullable: true }) after: string
  ) {
    const { id } = me;
    const all = await this.postsService.findAuthorsPosts({ authorId: id });

    return PostsPage.pageGen(all, first, after);
  }
}
