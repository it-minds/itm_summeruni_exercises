import { Controller, Get, Param, Query } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";
import { AuthorsPage } from "./models/author.page.model";

@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAuthors(
    @Query("first") first: number,
    @Query("after") after?: string
  ): Promise<AuthorsPage> {
    const all = await this.authorsService.findAll();
    return AuthorsPage.pageGen(all, first, after);
  }

  @Get(":id")
  getAuthor(@Param() { id }): Promise<Author> {
    return this.authorsService.findOneById(id);
  }
}
