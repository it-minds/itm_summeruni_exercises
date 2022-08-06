import { Body, Controller, Get, Header, Post } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Author } from "../authors/models/author.model";
import { AuthService } from "./auth.service";
import { LoginInput } from "./models/login.input";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("me")
  @ApiBearerAuth('authorization')
  @Header("Cache-Control", "none")
  async getMe(): Promise<Author> {
    return await this.authService.findMe();
  }

  @Post("login")
  @Public()
  async login(@Body() { username, password }: LoginInput): Promise<string> {
    return await this.authService.login(username, password);
  }
}
