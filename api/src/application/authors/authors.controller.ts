import { Controller, Get } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";

@Controller()
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAuthor(): Promise<Author> {
    return this.authorsService.findOneById(1);
  }
}
