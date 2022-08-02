import { Inject, Injectable } from "@nestjs/common";
import { AuthorEntity } from "src/domain/author.entity";
import { IApplicationContext } from "../common/services/applicationcontext.interface";
import { Author } from "./models/author.model";

@Injectable()
export class AuthorsService {
  constructor(
    @Inject("IApplicationContext_AuthorEntity") private applicationContextAuthorEntity: IApplicationContext<AuthorEntity>
  ) {}

  async findOneById(id: number): Promise<Author> {

    const author = await this.applicationContextAuthorEntity.getById(id);
    
    if (!author) {
      throw new Error("404 - not found")
    }

    // const posts = await this.applicationContextPostEntity.queryForMany({
    //   authorId: author.id
    // })

    const dto = new Author({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,

      // posts: posts.map(post => new Post({
      //   id: post.id,
      //   text: post.text,
      //   timestamp: post.timestamp
      // }))
    })

    return dto;    
  }
}
