import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Header,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Author } from "../authors/models/author.model";
import { PostsService } from "../posts";
import { PostsPage } from "../posts/models/post.page.model";
import { AuthService } from "./auth.service";
import { LoginInput } from "./models/login.input";
import { LoginOutput } from "./models/login.output";
import { Me } from "./models/me.model";
import { Public } from "./public.decorator";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly postsService: PostsService
  ) {}

  @Post("login")
  @Public()
  @ApiResponse({
    type: LoginOutput,
  })
  async login(
    @Body() { username, password }: LoginInput
  ): Promise<LoginOutput> {
    const token = await this.authService.login(username, password);
    return new LoginOutput({ token });
  }

  @Get("me")
  @ApiResponse({
    type: Me,
  })
  @ApiBearerAuth("authorization")
  @Header("Cache-Control", "none")
  async getMe(): Promise<Author> {
    return await this.authService.findMe();
  }

  @Get("me/posts")
  @ApiResponse({
    type: PostsPage,
  })
  @ApiBearerAuth("authorization")
  async getMyPosts(
    @Query("first") first: number,
    @Query("after", new DefaultValuePipe("")) after = ""
  ): Promise<PostsPage> {
    const me = await this.authService.findMe();
    const all = await this.postsService.findAuthorsPosts({ authorId: +me.id });

    return PostsPage.pageGen(all, first, after);
  }
}
