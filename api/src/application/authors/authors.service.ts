import { Inject, Injectable } from "@nestjs/common";
import { IApplicationContext } from "../common/interfaces/applicationcontext.interface";
import { ICurrentUserService } from "../common/interfaces/auth/currentuser.interface";
import { Author } from "./models/author.model";

@Injectable()
export class AuthorsService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext
  ) {}

  async findOneById(id: number): Promise<Author> {
    const author = await this.applicationContext.authors.getById(id);

    if (!author) {
      throw new Error("404 - not found");
    }

    const dto = new Author({
      id: author.id,
      username: author.name,
    });

    return dto;
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.applicationContext.authors.getAll();

    const dtos = authors.map((author) => {
      return new Author({
        id: author.id,
        username: author.name,
      });
    });

    return dtos;
  }
}
