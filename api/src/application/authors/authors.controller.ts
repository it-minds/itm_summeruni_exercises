import { Controller, Get, Param } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";

@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAuthors(): Promise<Author> {
    return this.authorsService.findOneById(1);
  }

  @Get("me")
  getMe(): Promise<Author> {
    return this.authorsService.findMe();
  }

  @Get(":id")
  getAuthor(@Param() { id } ): Promise<Author> {
    return this.authorsService.findOneById(id);
  }
}
