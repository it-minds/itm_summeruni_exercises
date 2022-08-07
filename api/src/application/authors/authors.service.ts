import { Inject, Injectable } from "@nestjs/common";
import { IApplicationContext } from "../common/interfaces/applicationcontext.interface";
import { ICurrentUserService } from "../common/interfaces/auth/currentuser.interface";
import { ITokenService } from "../common/interfaces/auth/token.interface";
import { NewAuthor } from "./models/author.input";
import { Author } from "./models/author.model";

@Injectable()
export class AuthorsService {
  constructor(
    @Inject("IApplicationContext")
    private applicationContext: IApplicationContext,
    @Inject("ITokenService")
    private tokenService: ITokenService
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

  async createAuthor({ password, username }: NewAuthor): Promise<Author> {
    const isExisting = await this.applicationContext.authors.queryForFirst({
      name: username,
    });

    if (isExisting) {
      throw new Error("user already exists");
    }

    const hash = await this.tokenService.hashPassword(password);
    this.applicationContext.authors.add({
      name: username,
      password: hash,
    });

    await this.applicationContext.authors.saveChanges();

    const author = await this.applicationContext.authors.queryForOne({
      name: username,
      password: hash,
    });

    const dto = new Author({
      id: author.id,
      username: author.name,
    });

    return dto;
  }
}
