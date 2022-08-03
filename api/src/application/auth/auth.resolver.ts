import {
  Int,
  Parent,
  Args,
  Resolver,
  Query,
  ResolveField,
  Mutation,
} from "@nestjs/graphql";
import { PostsPage } from "../posts/models/post.page.model";
import { PostsService } from "../posts/posts.service";
import { AuthService } from "./auth.service";
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
  async login(
    @Args({ name: "username", type: () => String }) username: string,
    @Args({ name: "password", type: () => String }) password: string
  ) {
    return await this.authService.login(username, password);
  }

  @ResolveField("posts", (returns) => PostsPage, {})
  async getMyPosts(
    @Parent() me: Me,
    @Args("first", { type: () => Int }) first: number,
    @Args("after", { type: () => String, nullable: true }) after: string
  ) {
    const { id } = me;
    const all = await this.postsService.findAll({ authorId: id });

    return PostsPage.pageGen(all, first, after);
  }
}
